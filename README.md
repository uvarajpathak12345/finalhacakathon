HealthAI: Wound Photo Scan and Symptom Analysis Platform

📚 Project Overview

HealthAI is an advanced health analysis platform designed to assist users with wound photo scans, disease symptom checks, and AI-powered health recommendations. The platform leverages MongoDB, Node.js, Express, Google Gemini API, and a modern frontend stack for seamless performance.

🩺 Core Features:

Appointment Management:

Stores appointment data in MongoDB.

Doctors can view and manage patient appointments.

Wound Photo Scan with Google Gemini API:

Users can upload wound photos (e.g., acne, injuries).

Google Gemini API analyzes the photo.

Provides health recommendations and self-care tips.

AI Health Chatbot:

AI-powered chatbot answers queries about diseases, genetics, DNA, rare diseases, and blood tests.

Focuses exclusively on health-related topics.

Symptom Checker:

Users can input symptoms (e.g., fever, headache).

Analyzes symptoms and predicts potential diseases.

Suggests precautions, dietary plans, and safety measures.

Technology Stack:

Backend: Node.js, Express, MongoDB

Frontend: React.js, Tailwind CSS, MUI UI, Acernity

AI Integration: Google Gemini API

AI Assistance:

ChatGPT was used for solving development problems.

🛠️ Setup and Installation

Follow these steps to set up and run the project on your local machine:

Prerequisites:

MongoDB installed and running.

Node.js installed.

Installation Steps:

Clone the Repository:

git clone <your-repo-url>
cd <your-project-folder>

Install Dependencies:

npm install

Setup Environment Variables:

Create a .env file in the root directory.

Add the necessary environment variables such as MongoDB connection string and Gemini API key.

Run the Backend Server:

npm run server

Run the Frontend:
Open another terminal and run:

npm run dev

Access the Application:

Visit http://localhost:3000 in your browser.

🚀 Key Highlights:

User-friendly UI with MUI and Tailwind CSS.

AI-driven insights powered by Google Gemini API.

Health chatbot specializing in disease and genetics-related queries.

Real-time symptom analysis and health recommendations.

🤝 Contributions:

Feel free to fork this repository, raise issues, or submit pull requests to improve the platform.
