/* =====================================================
   E.M.A RESTAURANT
   Base de données MySQL
   Fichier : server/database.sql
===================================================== */

CREATE DATABASE IF NOT EXISTS ema_restaurant
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE ema_restaurant;


/* =====================================================
   1. CATÉGORIES DES PLATS
===================================================== */

CREATE TABLE IF NOT EXISTS categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


/* =====================================================
   2. PRODUITS DU MENU
===================================================== */

CREATE TABLE IF NOT EXISTS products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    category_id INT UNSIGNED NULL,

    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL UNIQUE,
    description TEXT NULL,

    price INT UNSIGNED NOT NULL,
    image VARCHAR(500) NULL,

    is_available BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE SET NULL,

    INDEX idx_products_available (is_available),
    INDEX idx_products_category (category_id)
);


/* =====================================================
   3. COMMANDES
===================================================== */

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    reference VARCHAR(40) NOT NULL UNIQUE,

    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL,

    phone VARCHAR(25) NOT NULL,
    email VARCHAR(150) NULL,

    city VARCHAR(100) NOT NULL,
    district VARCHAR(120) NOT NULL,
    address VARCHAR(250) NOT NULL,

    delivery_instructions VARCHAR(500) NULL,
    notes VARCHAR(500) NULL,

    subtotal INT UNSIGNED NOT NULL,
    delivery_fee INT UNSIGNED NOT NULL DEFAULT 1000,
    total INT UNSIGNED NOT NULL,

    payment_method ENUM(
        'cash_on_delivery',
        'mtn_momo',
        'other_mobile_money'
    ) NOT NULL DEFAULT 'cash_on_delivery',

    payment_status ENUM(
        'unpaid',
        'pending',
        'paid',
        'failed',
        'refunded'
    ) NOT NULL DEFAULT 'unpaid',

    status ENUM(
        'pending',
        'confirmed',
        'preparing',
        'ready',
        'out_for_delivery',
        'delivered',
        'cancelled'
    ) NOT NULL DEFAULT 'pending',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL
        DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_orders_phone (phone),
    INDEX idx_orders_status (status),
    INDEX idx_orders_created_at (created_at)
);


/* =====================================================
   4. ARTICLES DE CHAQUE COMMANDE
===================================================== */

CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    order_id BIGINT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NULL,

    product_name VARCHAR(150) NOT NULL,

    unit_price INT UNSIGNED NOT NULL,
    quantity SMALLINT UNSIGNED NOT NULL,

    line_total INT UNSIGNED NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE SET NULL,

    CONSTRAINT chk_order_items_quantity
        CHECK (quantity >= 1 AND quantity <= 99),

    INDEX idx_order_items_order (order_id)
);


/* =====================================================
   5. CATÉGORIES DE DÉPART
===================================================== */

INSERT IGNORE INTO categories (name, slug, description)
VALUES
    ('Plats africains', 'plats-africains',
     'Les spécialités africaines du restaurant.'),

    ('Grillades', 'grillades',
     'Viandes, poissons et grillades.'),

    ('Fast-food', 'fast-food',
     'Burgers, paninis, tacos et autres spécialités.'),

    ('Entrées', 'entrees',
     'Les entrées et petites portions.'),

    ('Desserts', 'desserts',
     'Les desserts proposés par E.M.A.'),

    ('Boissons', 'boissons',
     'Les boissons disponibles au restaurant.');