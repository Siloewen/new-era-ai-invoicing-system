# New Era AI - Invoicing System v1

## Overview
A comprehensive invoicing system designed to generate accurate monthly invoices for clients with automated workflows and professional PDF generation.

## Architecture
- **Backend**: NestJS + TypeScript + Prisma
- **Frontend**: Next.js + TailwindCSS
- **Database**: PostgreSQL
- **Queue**: BullMQ + Redis
- **Storage**: AWS S3
- **Auth**: JWT-based authentication

## Project Structure
```
backend/          # NestJS API server
frontend/         # Next.js web application
scripts/          # Deployment and utility scripts
infrastructure/   # Docker and deployment configs
```

## Quick Start
1. Clone the repository
2. Run `docker-compose up` to start development environment
3. Navigate to `http://localhost:3000` for the frontend
4. API available at `http://localhost:3001`

## Development
Each directory contains its own README with specific setup instructions.