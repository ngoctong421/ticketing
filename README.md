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

2. **Install Skaffold:**
   Follow the [Skaffold Installation Guide](https://skaffold.dev/docs/install/)

3. **Install ingress-nginx:**
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0-beta.0/deploy/static/provider/cloud/deploy.yaml
   ```

4. **Setup ingress routing:**
   ```bash
   kubectl apply -f ./infra/k8s/ingress-srv.yaml
   ```

5. **Start services:**
   ```bash
   skaffold dev
   ```

## Usage

The application provides a ticket marketplace where users can:
- Create and list tickets for sale
- Purchase tickets from other users
- Process payments securely
- Manage orders and reservations

## Microservices Architecture

The project consists of the following services:

- **Auth Service**: Handles user authentication
- **Tickets Service**: Manages ticket creation and updates
- **Orders Service**: Handles order processing
- **Payments Service**: Processes payments
- **Expiration Service**: Manages ticket reservation timeouts
- **NATS Streaming Server**: Event bus for inter-service communication

## Features

- User authentication and authorization
- Ticket creation and management
- Order processing and tracking
- Secure payment handling
- Automated expiration for reserved tickets
- Event-driven architecture
- Kubernetes deployment
- Automated CI/CD with Skaffold

## Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a pull request

## Contact

For questions: ngoctong421@gmail.com

## License

This project does not have a specific license.
