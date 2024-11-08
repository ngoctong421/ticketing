
# Ticketing

**Short Description:**

Ticketing is a project I developed to learn about microservices architecture.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Microservices Architecture](#microservices-architecture)
- [Features](#features)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)

## Introduction

Ticketing is a project designed to learn about microservices architecture by breaking down functionalities into independent, manageable services. The project leverages various technologies to support scalable and modular service development.

## Installation

Follow these steps to install and launch the project using Skaffold:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ngoctong421/ticketing.git
   cd ticketing
   ```

2. **Install Skaffold:** (if you haven’t already)
   [Skaffold Installation Guide](https://skaffold.dev/docs/install/)

3. **Install ingress-nginx:** (if not already installed)
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0-beta.0/deploy/static/provider/cloud/deploy.yaml
   ```

4. **Create an Ingress resource for routing:** The project includes an ingress service for routing traffic to the various services. You can apply the following ingress configuration:
   ```bash
   kubectl apply -f ./infra/k8s/ingress-srv.yaml
   ```

5. **Start the services with Skaffold:**
   ```bash
   skaffold dev
   ```

Skaffold will automatically set up the Kubernetes environment and deploy the necessary services, including ingress-nginx for routing traffic.

## Usage


## Microservices Architecture

This project includes five main services along with an event bus service:


## Features


## Contributing

If you would like to contribute, please follow these steps:

1. Fork the project
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a pull request

## Contact

For more information or questions, please contact me at: ngoctong421@gmail.com

## License

This project does not have a specific license.
