# 1Fi Smartphone Financing Application

A full-stack web application where users can browse smartphones, select a variant and EMI plan, and submit a financing application.

## Live Demo

**Application:** https://onefi-smartphone-financing-application-2.onrender.com

**Backend API:** https://onefi-smartphone-financing-backend.onrender.com

**Health Check:** https://onefi-smartphone-financing-backend.onrender.com/api/health

## Features

- Browse available smartphones
- View product details and variants
- Select an EMI plan
- View EMI details including tenure, interest rate, monthly amount, and cashback
- Review the selected product and plan before applying
- Submit a financing application
- Basic form validation
- Store application data in PostgreSQL

## Tech Stack

**Frontend:** React, Vite, React Router DOM, CSS

**Backend:** Node.js, Express.js

**Database:** PostgreSQL

**Deployment:** Render

## Application Flow

```text
Home
  ↓
Select Smartphone
  ↓
Choose Variant
  ↓
Select EMI Plan
  ↓
Checkout
  ↓
Submit Application
  ↓
PostgreSQL
  ↓
Success Page
```

## Project Architecture

```text
React Frontend
      ↓ REST API
Node.js + Express Backend
      ↓
PostgreSQL Database
```

## Project Structure

```text
Project-1fi
├── database
│   └── onefi_db.sql
├── express-backend
│   └── src
│       ├── config
│       │   └── db.js
│       └── server.js
├── react-frontend
│   └── src
│       ├── pages
│       ├── App.jsx
│       └── main.jsx
└── README.md
```

## Database

The application uses the following PostgreSQL tables:

- `products`
- `product_variants`
- `emi_plans`
- `applications`

The database schema and sample data are available in:

```text
database/onefi_db.sql
```

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Harishragavendran07/1Fi-Smartphone-Financing-Application.git
cd Project-1fi
```

### 2. Database Setup

Create a PostgreSQL database named `onefi_db` and run:

```text
database/onefi_db.sql
```

### 3. Backend Setup

```bash
cd express-backend
npm install
```

Create a `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=onefi_db
DB_USER=postgres
DB_PASSWORD=your_postgresql_password
```

Start the backend:

```bash
npm run dev
```

### 4. Frontend Setup

```bash
cd react-frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check backend and database status |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:slug` | Get product details with variants and EMI plans |
| POST | `/api/applications` | Submit a financing application |

## Author

**Harishragavendran R**