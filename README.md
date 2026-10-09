# 🛒 E-commerce Full-Stack Application

A robust backend and API service built for an e-commerce platform, featuring user authentication, category management, and robust request handling.

---

## 📋 Table of Contents
- [About The Project](#-about-the-project)
- [Built With](#-built-with)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Endpoints Overview](#-api-endpoints-overview)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About The Project
This project serves as the core backend infrastructure for a modern e-commerce web application. It handles core e-commerce workflows including user registration, product categorization, and data persistence securely and efficiently.

---

## 💻 Built With
* **Node.js** - JavaScript runtime environment
* **Express.js** - Web framework for routing and middleware
* **MongoDB & Mongoose** - NoSQL database and object data modeling
* **EJS** - Embedded JavaScript templating (for server-rendered views)
* **Tailwind CSS** - Utility-first CSS framework for styling

---

## 📚 API Documentation

You can view, inspect, and test all available endpoints using the interactive Postman documentation:

* **Postman Documentation Link:** [View Interactive API Docs](https://moed6634-4965399.postman.co/workspace/a207ff70-ee9d-46cb-b5b6-a18b12c1a084/documentation/51693015-4d18ec6c-9713-4022-bfd5-171840b78c41?sideView=agentMode)
* **Base URL (Local):** `http://localhost:3000/api`

---

## 📂 Project Structure
```text
E-commerce/
├── models/         # Mongoose schemas (User, Category, etc.)
├── routes/         # Express route handlers
├── views/          # EJS template partials and pages
├── public/         # Static assets (CSS, images, client-side JS)
├── .env            # Environment configuration
├── server.js       # Main application entry point
└── package.json    # Project dependencies and scripts
