CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    color VARCHAR(100) NOT NULL,
    storage VARCHAR(50) NOT NULL,
    mrp NUMERIC(12,2) NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    image_url TEXT NOT NULL,
    stock INTEGER DEFAULT 0,
    CONSTRAINT product_variants_product_id_fkey
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);

CREATE TABLE emi_plans (
    id SERIAL PRIMARY KEY,
    variant_id INTEGER NOT NULL,
    tenure_months INTEGER NOT NULL,
    interest_rate NUMERIC(5,2) NOT NULL,
    monthly_amount NUMERIC(12,2) NOT NULL,
    cashback NUMERIC(12,2) DEFAULT 0,
    CONSTRAINT emi_plans_variant_id_fkey
        FOREIGN KEY (variant_id)
        REFERENCES product_variants(id)
        ON DELETE CASCADE
);

CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    employment_type VARCHAR(100) NOT NULL,
    monthly_income NUMERIC(12,2) NOT NULL,
    address TEXT NOT NULL,
    product_id INTEGER NOT NULL,
    variant_id INTEGER NOT NULL,
    emi_plan_id INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'SUBMITTED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT applications_product_id_fkey
        FOREIGN KEY (product_id)
        REFERENCES products(id),

    CONSTRAINT applications_variant_id_fkey
        FOREIGN KEY (variant_id)
        REFERENCES product_variants(id),

    CONSTRAINT applications_emi_plan_id_fkey
        FOREIGN KEY (emi_plan_id)
        REFERENCES emi_plans(id)
);

INSERT INTO products (name, slug, brand, description)
VALUES
(
    'Apple iPhone 17 Pro',
    'apple-iphone-17-pro',
    'Apple',
    'Premium smartphone with advanced performance and professional camera features.'
),
(
    'Samsung Galaxy S24 Ultra',
    'samsung-galaxy-s24-ultra',
    'Samsung',
    'Flagship Android smartphone with powerful performance and an advanced camera system.'
),
(
    'Google Pixel 9 Pro',
    'google-pixel-9-pro',
    'Google',
    'Premium Google smartphone featuring intelligent software and an advanced camera.'
);

INSERT INTO product_variants
(product_id, color, storage, mrp, price, image_url, stock)
VALUES
(
    1,
    'Silver',
    '256GB',
    139900,
    129900,
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab',
    10
),
(
    1,
    'Deep Blue',
    '512GB',
    159900,
    149900,
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab',
    8
),
(
    2,
    'Titanium Gray',
    '256GB',
    134999,
    119999,
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf',
    12
),
(
    2,
    'Titanium Black',
    '512GB',
    154999,
    139999,
    'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf',
    7
),
(
    3,
    'Obsidian',
    '256GB',
    109999,
    99999,
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97',
    15
),
(
    3,
    'Porcelain',
    '512GB',
    129999,
    119999,
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97',
    9
);

INSERT INTO emi_plans
(variant_id, tenure_months, interest_rate, monthly_amount, cashback)
VALUES
(1, 6, 0, 21650, 1000),
(1, 12, 10.5, 11450, 2000),

(2, 6, 0, 24984, 1500),
(2, 12, 10.5, 13200, 2500),

(3, 6, 0, 19999, 1000),
(3, 12, 10.5, 10999, 2000),

(4, 6, 0, 23333, 1500),
(4, 12, 10.5, 12499, 2500),

(5, 6, 0, 16666, 1000),
(5, 12, 10.5, 9200, 2000),

(6, 6, 0, 19999, 1500),
(6, 12, 10.5, 10400, 2500);