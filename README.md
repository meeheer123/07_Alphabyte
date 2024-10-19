# ResolvePro: AI-Powered CI/CD Error Management System

**ResolvePro** is an innovative tool designed to manage and resolve issues in CI/CD pipelines. By leveraging the power of **Generative AI** and **Retrieval-Augmented Generation (RAG)**, ResolvePro automates the process of logging, classifying, and resolving errors, thus improving deployment efficiency.

### 🚀 **Key Features**
1. **Automated Error Logging**  
   ResolvePro automatically logs errors encountered in CI/CD pipelines in real-time, saving developer time and minimizing human error.

2. **AI-Powered Classification**  
   Using advanced AI, ResolvePro classifies errors and suggests potential causes, making the troubleshooting process faster and more accurate.

3. **Intelligent Notifications**  
   The system sends alerts directly to your team with detailed error information, classifications, and proposed solutions, ensuring timely responses.

4. **Slack Integration**  
   Critical issues are instantly logged to Slack, allowing for real-time team collaboration and communication.

5. **Analytics Dashboard**  
   Visualize error trends and monitor system health through comprehensive charts and dashboards, enabling informed, data-driven decisions.

6. **AI Solver Interface**  
   Developers can input specific errors and receive AI-generated solutions, streamlining error resolution.

### 🏗️ **Architecture and Components**

#### **Frontend (React + Vite)**  
The frontend is built using **React** and **Vite**, which offers a smooth development experience and optimized production builds.

##### **Key Components:**

1. **ErrorAnalyticsDashboard**  
   - Displays error statistics and trends using charts such as `BarChart` and `PieChart`.  
   - Allows users to filter and select projects for more targeted error analysis.  
   - Supports a theme toggle for light/dark mode.

   **How to use**:  
   - View trends over time, project-wise error breakdowns, and overall system health using charts.
   - Use the filters to narrow down specific projects or date ranges.

2. **ErrorClassificationDashboard**  
   - Displays a categorized list of errors by severity and frequency.
   - Includes detailed insights like core error issues, potential causes, and suggested solutions.  
   - Fetches and displays real-time error data.

   **How to use**:  
   - Check the error list for critical issues and access details by clicking on individual errors.
   - Use the AI-powered solutions to get immediate suggestions for fixing problems.

---

### 🛠️ **How to Get Started**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/meeheer123/07_Alphabyte.git
   ```

2. **Install dependencies and run server:**
   ```bash
   cd 07_Alphabyte/Backend
   npm install
   node server.js

   cd ..
   cd FirstProblemMlModel && pip install -r requirements.txt
   cd api && python index.py

   cd ..
   npm install && npm run dev
   ```

4. **Navigate to the local server in your browser:**
   ```bash
   http://localhost:5173/
   ```

5. **Connect Slack for Notifications**  
   - Add your Slack webhook URL in the environment variables to enable Slack integration.

---

### 📊 **Analytics Dashboard**

ResolvePro provides visual analytics to keep track of the health of your CI/CD pipelines:

- **Error Trends**: Analyze error frequency over time.
- **Error Severity**: View errors based on their severity (e.g., critical, major, minor).
- **Project-specific Analysis**: Drill down into errors for specific projects.

### 🧠 **AI-Powered Error Solver**

The **AI Solver Interface** is designed to help developers by providing instant AI-generated solutions for specific errors:

- **Input**: Enter the error details you’re facing.
- **AI Solution**: Receive an AI-suggested fix for the issue, or follow detailed steps provided by the system.

---

### 🔗 **Slack Integration**

ResolvePro is integrated with Slack to improve team communication:

1. **Set up Slack Integration**  
   Add your Slack webhook URL in the `.env` file:
   ```bash
   SLACK_WEBHOOK_URL="your_slack_webhook_url"
   ```

2. **Error Notifications**  
   - ResolvePro will post real-time notifications to your Slack channel with error details and suggested fixes.

---

### 🛠️ **Development Setup**

1. **Frontend**  
   - Built using **React** with **Vite** for blazing-fast development.
   - Use the following commands to start working on the frontend:
   ```bash
   npm install # Install dependencies
   npm run dev # Start the local development server
   ```

2. **Backend (API for Error Management)**  
   - ResolvePro uses a backend service (e.g., **Node.js**, **Express**) to fetch errors and provide AI-generated solutions.
   - To run the backend:
   ```bash
   npm run backend
   ```

---

### 📄 **Contributing**

Want to contribute? Awesome! Here's how you can help:

1. **Fork the project**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

### 📢 **Support**

If you encounter any issues or have questions about ResolvePro, please feel free to open an issue.

--- 

### 📝 **License**

This project is licensed under the MIT License.
