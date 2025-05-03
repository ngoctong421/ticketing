# Ticketing

**Short Description:**

A microservices architecture learning project implementing a ticket marketplace system.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Architecture](#architecture)
- [Features](#features)
- [Development](#development)
- [Contact](#contact)

## Overview

Ticketing demonstrates microservices architecture principles through a practical ticket marketplace implementation. Users can list, purchase, and manage tickets in a distributed system.

## Tech Stack

- Node.js/TypeScript
- Docker
- Kubernetes
- NATS Streaming
- MongoDB
- Skaffold
- Jest (Testing)

## Setup

1. **Clone repository:**

   ```bash
   git clone https://github.com/ngoctong421/ticketing.git
   cd ticketing
   ```

2. **Prerequisites:**

   - Install [Skaffold](https://skaffold.dev/docs/install/)
   - Install [kubectl](https://kubernetes.io/docs/tasks/tools/)
   - Setup [Docker](https://docs.docker.com/get-docker/)

3. **Deploy ingress-nginx:**

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0-beta.0/deploy/static/provider/cloud/deploy.yaml
   ```

4. **Launch services:**
   ```bash
   skaffold dev
   ```

## Architecture

Microservices:

- Auth: User authentication/authorization
- Tickets: Ticket management
- Orders: Order processing
- Payments: Payment handling
- Expiration: Reservation timeouts
- NATS: Event bus

## Features

- User authentication
- Ticket marketplace
- Order management
- Payment processing
- Event-driven communication
- Kubernetes deployment
- Automated development workflow

## Development

1. Create feature branch
2. Make changes
3. Write tests
4. Submit pull request

## Contact

Email: ngoctong421@gmail.com
