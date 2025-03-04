# Flask-React CI/CD Demo

This project demonstrates a CI/CD pipeline using GitHub Actions to build, test, and deploy a Dockerized full-stack web application. The backend is built with Flask, while the frontend leverages React. This setup serves as a starting point for building scalable applications with automated workflows.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [CI/CD Pipeline](#cicd-pipeline)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The primary goal of this repository is to provide an example of how to integrate a Flask and React application using Docker, along with a fully automated CI/CD pipeline via GitHub Actions. This setup ensures that every change is automatically tested, built, and deployed.

## Features

- **Dockerized Application**: Both backend and frontend are containerized for consistency across different environments.
- **CI/CD Pipeline**: Automated workflows using GitHub Actions manage building, testing, and deployment.
- **Full-Stack Integration**: Seamless communication between the Flask backend and React frontend.
- **Scalable Architecture**: Easy to extend and customize for more complex projects.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/)
- A GitHub account (for accessing GitHub Actions)
- Optionally, [Docker Compose](https://docs.docker.com/compose/) if you plan to run multiple containers together.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/regostar/flask_react_app.git
   cd flask_react_app
   ```

2. **Build the Docker Image:**

   If you are using a single Dockerfile for the entire application:

   ```bash
   docker build -t flask-react-app .
   ```

   If separate Dockerfiles are used for the backend and frontend, refer to each directory's README for specific build instructions.

## Usage

1. **Run the Docker Container:**

   ```bash
   docker run -p 5000:5000 flask-react-app
   ```

2. **Access the Application:**

   Open your browser and navigate to [http://localhost:5000](http://localhost:5000) to view the app.

## CI/CD Pipeline

The project includes a GitHub Actions workflow configured to:

- **Build** the Docker image on every commit.
- **Test** the application to ensure stability.
- **Deploy** (or push) the Docker image on successful builds.

### Workflow Customization

- The workflow file is located in the `.github/workflows` directory.
- Modify environment variables and secrets in your repository settings for deployment.
- Customize the workflow steps as needed to suit your deployment environment.

## Project Structure

```plaintext
├── backend          # Flask backend code
├── frontend         # React frontend code
├── .github          # GitHub Actions workflows
├── Dockerfile       # Docker configuration (or separate Dockerfiles for backend/frontend)
├── README.md        # Project documentation
└── ...              # Additional configuration and support files
```

## Contributing

Contributions are welcome! To contribute:

1. **Fork the repository.**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -am 'Add new feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/my-new-feature
   ```
5. **Open a pull request** with a detailed description of your changes.

Please ensure your code adheres to the project's standards and includes tests where applicable.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or support, please contact **Your Name** or open an issue in this repository.
