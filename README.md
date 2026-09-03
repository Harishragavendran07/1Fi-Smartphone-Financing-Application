1Fi Smartphone Financing Application

About the Project

This project is a simple full stack smartphone financing application.

Users can browse available smartphones, select a phone variant, choose an EMI plan and submit a financing application. The submitted application details are stored in PostgreSQL.

The project connects a React frontend, Node.js and Express backend, and PostgreSQL database to complete the application process.

Features

• View available smartphones
• View product details
• Select phone variant
• Select EMI plan
• View selected plan details
• View application summary
• Fill and submit financing application
• Basic form validation
• Save application details in PostgreSQL
• Show application submitted successfully message

Technologies Used

Frontend

React
Vite
React Router DOM
CSS

Backend

Node.js
Express.js

Database

PostgreSQL

Project Flow

Home Page
   ↓
Select a Phone
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

Project Structure

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

Database

The project uses a PostgreSQL database named onefi_db.

The following tables are used:

• products
• product_variants
• emi_plans
• applications

Relationship

products
   ↓
product_variants
   ↓
emi_plans

The applications table stores the user details along with the selected product, variant and EMI plan.

Database Setup

The database schema and sample product data are available in:

database/onefi_db.sql

Create a PostgreSQL database:

CREATE DATABASE onefi_db;

Connect to the database:

\c onefi_db

Run the SQL file to create the tables and insert the sample data.

Backend Setup

Go to the backend folder:

cd express-backend

Install dependencies:

npm install

Create a .env file with the following values:

PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=onefi_db
DB_USER=postgres
DB_PASSWORD=your_postgresql_password

Start the backend:

npm run dev

The backend runs on:

http://localhost:5000

Frontend Setup

Go to the frontend folder:

cd react-frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

Open the URL shown by Vite in the browser.

API Endpoints

Health Check

GET /api/health

Example response:

{
  "success": true,
  "message": "1Fi backend and database are running"
}


Get All Products

GET /api/products

Example response:

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


Get Product Details

GET /api/products/:slug

Example:

GET /api/products/apple-iphone-17-pro

Example response:

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


Submit Application

POST /api/applications

Example request:

{
  "fullName": "Test User",
  "email": "test@example.com",
  "mobile": "9092098875",
  "dateOfBirth": "2005-07-10",
  "employmentType": "Salaried",
  "monthlyIncome": 50000,
  "address": "Chennai, Tamil Nadu",
  "productId": 1,
  "variantId": 1,
  "emiPlanId": 1
}

Example response:

{
  "success": true,
  "message": "Application submitted successfully"
}


Sample Products

• Apple iPhone 17 Pro
• Samsung Galaxy S24 Ultra
• Google Pixel 9 Pro

Each product has multiple variants and EMI plans.

How to Test

1. Start PostgreSQL
2. Create the onefi_db database
3. Run the database/onefi_db.sql file
4. Start the backend
5. Start the frontend
6. Open the application in the browser
7. Select a smartphone
8. Select a variant
9. Select an EMI plan
10. Continue to checkout
11. Fill in the application form
12. Submit the application
13. Check the success page
14. Verify the submitted data in PostgreSQL

To check submitted applications:

SELECT * FROM applications;

Author

Harishragavendran R