1Fi Smartphone Financing Application

About the Project:

This project is a simple smartphone financing application.
Users can browse the available phones, select a variant, choose an EMI plan and submit their financing application. The submitted application details are stored in PostgreSQL.
The project connects the frontend, backend and database to complete the application process.

Features:

• View available smartphones
• View product details
• Select phone variant
• Select EMI plan
• View selected plan details
• Fill and submit financing application
• Basic form validation
• Save application details in PostgreSQL
• Show application submitted successfully message

Technologies Used:

Frontend:

React
Vite
React Router DOM
CSS

Backend:

Node.js
Express.js

Database:

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
Data saved in PostgreSQL
   ↓
Success Page

Project Structure

Project-1fi
│
├── express-backend
│   ├── src
│   │   ├── config
│   │   │   └── db.js
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── react-frontend
│   ├── src
│   │   ├── pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── ApplicationPage.jsx
│   │   │   └── ApplicationSuccessPage.jsx
│   │   ├── App.jsx
│   │   └── App.css
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

Relationship:

products
   ↓
product_variants
   ↓
emi_plans

When a user submits an application, the selected product, variant and EMI plan IDs are stored in the applications table.

Backend Setup

Go to the backend folder:

cd express-backend

Install dependencies:

npm install

Create a .env file:

PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=onefi_db
DB_USER=postgres
DB_PASSWORD=your_postgresql_password

Start the backend:

npm run dev

The backend runs on port 5000.

Frontend Setup

Go to the frontend folder:

cd react-frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

API Endpoints

Get all products

GET /api/products

Get product details

GET /api/products/:slug

Example:

GET /api/products/apple-iphone-17-pro

Submit application

POST /api/applications

The submitted application details along with the selected product, variant and EMI plan are saved in PostgreSQL.

Sample Products

• Apple iPhone 17 Pro
• Samsung Galaxy S24 Ultra
• Google Pixel 9 Pro

Each product has different variants and EMI plans.

How to Test

1. Start PostgreSQL
2. Start the backend
3. Start the frontend
4. Open the application in the browser
5. Select a smartphone
6. Select a variant
7. Select an EMI plan
8. Continue to checkout
9. Fill in the application form
10. Submit the application
11. Check the success page
12. Verify the data in PostgreSQL

To check submitted applications:

SELECT * FROM applications;

Author

Harishragavendran R