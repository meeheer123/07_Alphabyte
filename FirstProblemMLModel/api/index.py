import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from fuzzywuzzy import fuzz
import numpy as np
import json
import re
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

class ErrorClassifier:
    def __init__(self, csv_file):
        self.df = pd.read_csv(csv_file)
        self.vectorizer = TfidfVectorizer()
        self.tfidf_matrix = self.vectorizer.fit_transform(self.df['EventTemplate'])
        
    def preprocess_text(self, text):
        return text.replace('<*>', '.*')
        
    def fuzzy_match_score(self, str1, str2):
        return fuzz.ratio(str1, str2) / 100.0
        
    def semantic_similarity(self, query):
        query_vector = self.vectorizer.transform([query])
        return cosine_similarity(query_vector, self.tfidf_matrix).flatten()
        
    def combined_similarity(self, query, word_weight=0.8, semantic_weight=0.2):
        query = self.preprocess_text(query)
        fuzzy_scores = np.array([self.fuzzy_match_score(query, event) for event in self.df['EventTemplate']])
        semantic_scores = self.semantic_similarity(query)
        return word_weight * fuzzy_scores + semantic_weight * semantic_scores
        
    def find_top_matches(self, query, n=1):
        combined_scores = self.combined_similarity(query)
        top_indices = combined_scores.argsort()[-n:][::-1]
        return self.df.iloc[top_indices]

class ErrorAnalysisSystem:
    def __init__(self, csv_file, api_key):
        self.classifier = ErrorClassifier(csv_file)
        genai.configure(api_key=api_key)
        self.genai_model = genai.GenerativeModel('gemini-1.5-flash')

    def generate_ai_response(self, error_message, model_output):
        prompt = f"""
        # Error Analysis Prompt Template

        You are an AI assistant specialized in analyzing error messages and providing detailed insights. Given an error message and its classification, you need to provide a comprehensive analysis in JSON format. Here's an example followed by a new query:

        ## Example:

        Input Error Message: "10.251.35.1:50010:Got exception while serving blk_7940316270494947483 to /10.251.122.38:"

        Model Output:
        ```
        Unnamed: 0 Level Component EventTemplate type
        789 WARN dfs.DataNode Got exception while serving blk_<*> to /<*> HDFS
        ```

        Expected Output:
        {{
          "analysis": {{
            "coreIssue": "An exception occurred while the DataNode was serving a specific block to a client."
          }},
          "classification": "HDFS",
          "severity": "WARN",
          "likelyCause": "There could be network issues, disk I/O problems, or the block might be corrupted. It's also possible that the client disconnected unexpectedly during data transfer.",
          "suggestedSolution": [
            "Check the DataNode logs for more detailed error messages",
            "Verify the health of the HDFS cluster",
            "Ensure that the block is not corrupted by running fsck",
            "Check network connectivity between the DataNode and the client"
          ],
          "tips": [
            "Regularly monitor DataNode health and performance",
            "Implement proper error handling and retry mechanisms in HDFS clients",
            "Keep HDFS software up-to-date to benefit from bug fixes and performance improvements"
          ],
          "actionableRecommendations": [
            "Run 'hdfs fsck' to check for any corrupted blocks",
            "Review DataNode logs for any recurring issues or patterns",
            "Monitor network performance between DataNodes and clients",
            "Consider increasing the number of replicas for important data to improve fault tolerance"
          ]
        }}

        ## New Query:

        Input Error Message: "{error_message}"

        Model Output:
        {model_output}

        Based on the input error message and model output, provide a detailed analysis in the same JSON format as the example above. Include relevant information for all fields: analysis, classification, severity, likelyCause, suggestedSolution, tips, and actionableRecommendations. Do not include any markdown formatting or code blocks in your response, just the raw JSON object.
        """

        result = self.genai_model.generate_content(prompt)
        cleaned_result = result.text.strip()
        json_match = re.search(r'\{.*\}', cleaned_result, re.DOTALL)
        
        if json_match:
            try:
                ai_response = json.loads(json_match.group())
                return ai_response
            except json.JSONDecodeError as e:
                print(f'Failed to parse AI response as JSON: {e}')
                return {"error": "Invalid JSON format from AI", "rawResponse": cleaned_result}
        else:
            print('No JSON object found in AI response')
            return {"error": "No JSON object found in AI response", "rawResponse": cleaned_result}

    def process_error(self, error_message):
        top_matches = self.classifier.find_top_matches(error_message)
        model_output = top_matches[['Level', 'Component', 'EventTemplate', 'type']].to_dict(orient='records')
        ai_response = self.generate_ai_response(error_message, json.dumps(model_output))
        return {
            "errorMessage": error_message,
            "modelClassification": model_output,
            "aiAnalysis": ai_response
        }

# Initialize the ErrorAnalysisSystem
csv_file = os.environ.get('CSV_FILE', './combined_error.csv')
api_key = 'AIzaSyCi_rpYtGy-ms-Io7_2fz0CpjUhCIoBFlE'

if not api_key:
    raise ValueError("GOOGLE_API_KEY environment variable is not set")

system = ErrorAnalysisSystem(csv_file, api_key)

@app.route('/analyze', methods=['POST'])
def analyze_error():
    data = request.json
    if 'error_message' not in data:
        return jsonify({"error": "No error_message provided"}), 400
    
    error_message = data['error_message']
    result = system.process_error(error_message)
    return jsonify(result)

if __name__ == '__main__':
    port = 5000
    app.run(port=port, debug=True)
