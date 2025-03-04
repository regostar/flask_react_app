# Flask-React-Docker-Github CI/CD Demo


This project demonstrates a CI/CD pipeline using GitHub Actions to build, test, and deploy a Dockerized full-stack web application. The backend is built with Flask, while the frontend leverages React. The application supports **Docker Compose** for streamlined development but also allows running the backend and frontend separately using individual Dockerfiles.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Using Docker Compose (Recommended)](#using-docker-compose-recommended)
  - [Using Separate Dockerfiles](#using-separate-dockerfiles)
- [Usage](#usage)
- [CI/CD Pipeline](#cicd-pipeline)
- [Project Structure](#project-structure)
- [Deployment (Optional)](#deployment-optional)
  - [Deploy to Google Compute Engine (GCE)](#deploy-to-google-compute-engine-gce)
  - [Deploy to Google Kubernetes Engine (GKE)](#deploy-to-google-kubernetes-engine-gke)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The primary goal of this repository is to provide an example of how to integrate a Flask and React application using Docker and Docker Compose, along with a fully automated CI/CD pipeline via GitHub Actions. This setup ensures that every change is automatically tested, built, and deployed.

## Features

- **Dockerized Application**: Supports both Docker Compose and standalone Dockerfile-based builds.
- **Docker Compose Support**: Runs both the Flask backend and React frontend as separate services.
- **CI/CD Pipeline**: Automated workflows using GitHub Actions manage building, testing, and deployment.
- **Full-Stack Integration**: Seamless communication between the Flask backend and React frontend.
- **Scalable Architecture**: Easy to extend and customize for more complex projects.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)
- A GitHub account (for accessing GitHub Actions)

---

## Installation

### Using Docker Compose (Recommended)

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/regostar/flask_react_app.git
   cd flask_react_app
   ```

2. **Start the Application using Docker Compose:**
   ```bash
   docker-compose up --build
   ```
   - This command builds the backend and frontend images, runs both containers, and links them together.

3. **Stop the Application:**
   ```bash
   docker-compose down
   ```

### Using Separate Dockerfiles

If you prefer to run the backend and frontend separately, follow these steps:

1. **Build and Run the Flask Backend:**
   ```bash
   cd backend
   docker build -t flask-backend .
   docker run -p 5000:5000 flask-backend
   ```

2. **Build and Run the React Frontend:**
   ```bash
   cd frontend
   docker build -t react-frontend .
   docker run -p 3000:3000 react-frontend
   ```

**Note:** Ensure the backend is running before starting the frontend, as the frontend fetches data from the backend.

---

## Usage

### Running with Docker Compose:
1. **Start the Application:**
   ```bash
   docker-compose up
   ```

2. **Access the Application:**
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend API:** [http://localhost:5000](http://localhost:5000)

3. **Rebuild after making changes:**
   ```bash
   docker-compose up --build
   ```

### Running with Separate Dockerfiles:
1. **Start the backend separately:**
   ```bash
   docker run -p 5000:5000 flask-backend
   ```

2. **Start the frontend separately:**
   ```bash
   docker run -p 3000:3000 react-frontend
   ```

---

## CI/CD Pipeline

![image](https://github.com/user-attachments/assets/2a65efc7-2982-4a77-ab0c-c351bad95b03)

The project includes a GitHub Actions workflow configured to:

- **Build** the Docker images on every commit.
- **Run tests** to ensure application stability.
- **Deploy** (or push) the Docker images on successful builds.

### Workflow Customization

- The workflow file is located in the `.github/workflows` directory.
- Modify environment variables and secrets in your repository settings for deployment.
- Customize the workflow steps as needed to suit your deployment environment.

---

## Project Structure

```plaintext
├── backend          # Flask backend code
│   ├── Dockerfile   # Backend-specific Dockerfile
├── frontend         # React frontend code
│   ├── Dockerfile   # Frontend-specific Dockerfile
├── .github          # GitHub Actions workflows
├── docker-compose.yml # Docker Compose configuration
├── README.md        # Project documentation
└── ...              # Additional configuration and support files
```


---

## Deployment (Optional)

### Deploy to Google Compute Engine (GCE)

1. **Authenticate with GCP:**
   ```bash
   gcloud auth login
   gcloud config set project [YOUR_PROJECT_ID]
   ```

2. **Enable required services:**
   ```bash
   gcloud services enable compute.googleapis.com
   ```

3. **Create a VM instance on GCE:**
   ```bash
   gcloud compute instances create flask-react-vm \
       --machine-type=e2-medium \
       --image-family=debian-11 \
       --image-project=debian-cloud \
       --tags=http-server,https-server
   ```

4. **SSH into the instance and install Docker:**
   ```bash
   gcloud compute ssh flask-react-vm
   sudo apt update && sudo apt install -y docker.io docker-compose
   ```

5. **Clone the repository on the VM:**
   ```bash
   git clone https://github.com/regostar/flask_react_app.git
   cd flask_react_app
   ```

6. **Run the application using Docker Compose:**
   ```bash
   docker-compose up --build -d
   ```

7. **Allow external access to the instance:**
   ```bash
   gcloud compute firewall-rules create allow-http \
       --allow=tcp:80,tcp:3000,tcp:5000 \
       --target-tags=http-server
   ```

---

### Deploy to Google Kubernetes Engine (GKE)

1. **Enable required GCP services:**
   ```bash
   gcloud services enable container.googleapis.com
   ```

2. **Create a GKE cluster:**
   ```bash
   gcloud container clusters create flask-react-cluster \
       --num-nodes=2 \
       --zone=us-central1-a
   ```

3. **Authenticate `kubectl` with GKE:**
   ```bash
   gcloud container clusters get-credentials flask-react-cluster --zone us-central1-a
   ```

4. **Build and push Docker images to Google Container Registry (GCR):**
   ```bash
   docker build -t gcr.io/[YOUR_PROJECT_ID]/flask-backend:latest backend
   docker build -t gcr.io/[YOUR_PROJECT_ID]/react-frontend:latest frontend

   docker push gcr.io/[YOUR_PROJECT_ID]/flask-backend:latest
   docker push gcr.io/[YOUR_PROJECT_ID]/react-frontend:latest
   ```

5. **Deploy to Kubernetes:**
   ```bash
   kubectl apply -f k8s/backend-deployment.yaml
   kubectl apply -f k8s/frontend-deployment.yaml
   kubectl apply -f k8s/backend-service.yaml
   kubectl apply -f k8s/frontend-service.yaml
   ```

6. **Get the external IP:**
   ```bash
   kubectl get services
   ```

7. **Access the application using the external IP assigned to the frontend service.**

---
---

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

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact


For any questions or support, please contact renugopal17.siva@gmail.com or open an issue in this repository.



Test update