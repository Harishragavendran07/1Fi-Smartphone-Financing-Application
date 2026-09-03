# 1Fi Smartphone Financing Application

A full-stack web application that allows users to browse smartphones, select a variant, choose an EMI plan, and submit a smartphone financing application.

The application connects a React frontend, Node.js and Express backend, and PostgreSQL database to complete the financing application process.

---

## Features

- View available smartphones
- View detailed product information
- Select a smartphone variant
- Choose an EMI plan
- View EMI details, including monthly amount, tenure, interest rate, and cashback
- View an application summary before submitting
- Fill and submit a financing application
- Basic client-side form validation
- Save application details in PostgreSQL
- Display a successful application submission message

---

## Technologies Used

### Frontend

- React
- Vite
- React Router DOM
- CSS

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL

---

## Project Flow

```text
Home Page
   ↓
Select a Smartphone
   ↓
Product Details
   ↓
Select Variant
   ↓
Select EMI Plan
   ↓
Checkout
   ↓
Fill Application Form
   ↓
Submit Application
   ↓
Data Saved in PostgreSQL
   ↓
Success Page
```

---

## Project Architecture

```text
React Frontend
      ↓
Express.js Backend
      ↓
PostgreSQL Database
```

---

## Project Structure

```text
Project-1fi
│
├── database
│   └── onefi_db.sql
│
├── express-backend
│   ├── src
│   │   ├── config
│   │   │   └── db.js
│   │   ├── routes
│   │   │   └── productRoutes.js
│   │   └── server.js
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── react-frontend
│   ├── src
│   │   ├── assets
│   │   ├── pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── ApplicationPage.jsx
│   │   │   └── ApplicationSuccessPage.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

## Database

The project uses PostgreSQL.

The following tables are used:

- `products`
- `product_variants`
- `emi_plans`
- `applications`

### Database Relationship

```text
products
   ↓
product_variants
   ↓
emi_plans
```

The `applications` table stores user information along with the selected product, variant, and EMI plan.

### Database Setup

The database schema and sample product data are available in:

```text
database/onefi_db.sql
```

Create a PostgreSQL database:

```sql
CREATE DATABASE onefi_db;
```

Connect to the database:

```sql
\c onefi_db
```

Run the SQL file to create the required tables and insert sample product data.

---

## Backend Setup

Go to the backend folder:

```bash
cd express-backend
```

Install dependencies:

```bash
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

The backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Go to the frontend folder:

```bash
cd react-frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Open the URL displayed by Vite in your browser.

---

## API Endpoints

### Health Check

```http
GET /api/health
```

Example response:

```json
{
  "success": true,
  "message": "1Fi backend and database are running"
}
```

---

### Get All Products

```http
GET /api/products
```

Example response:

```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "Apple iPhone 17 Pro",
      "slug": "apple-iphone-17-pro",
      "brand": "Apple"
    }
  ]
}
```

---

### Get Product Details

```http
GET /api/products/:slug
```

Example:

```http
GET /api/products/apple-iphone-17-pro
```

Example response:

```json
{
  "success": true,
  "product": {
    "id": 1,
    "name": "Apple iPhone 17 Pro",
    "brand": "Apple",
    "variants": [
      {
        "id": 1,
        "color": "Silver",
        "storage": "256GB",
        "price": "129900.00",
        "emiPlans": [
          {
            "id": 1,
            "tenureMonths": 6,
            "interestRate": 0,
            "monthlyAmount": 21650,
            "cashback": 1000
          }
        ]
      }
    ]
  }
}
```

---

### Submit Financing Application

```http
POST /api/applications
```

Example request:

```json
{
  "fullName": "Test User",
  "email": "test@example.com",
  "phone": "9092098875",
  "dateOfBirth": "2005-07-10",
  "employmentType": "Salaried",
  "monthlyIncome": 50000,
  "address": "Chennai, Tamil Nadu",
  "productId": 1,
  "variantId": 1,
  "emiPlanId": 1
}
```

Example response:

```json
{
  "success": true,
  "message": "Application submitted successfully"
}
```

---

## Sample Products

The application includes sample data for:

- Apple iPhone 17 Pro
- Samsung Galaxy S24 Ultra
- Google Pixel 9 Pro

Each product contains multiple variants and EMI plans.

---

## How to Test

1. Start PostgreSQL.
2. Create the `onefi_db` database.
3. Run `database/onefi_db.sql`.
4. Configure the backend `.env` file.
5. Start the backend.
6. Start the frontend.
7. Open the application in your browser.
8. Select a smartphone.
9. Select a variant.
10. Choose an EMI plan.
11. Continue to checkout.
12. Fill in the financing application form.
13. Submit the application.
14. Verify the success page.
15. Check the submitted data in PostgreSQL.

To view submitted applications:

```sql
SELECT * FROM applications;
```

---

## Author

**Harishragavendran R**