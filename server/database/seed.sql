USE ema_restaurant;

INSERT INTO products (
    category_id,
    name,
    slug,
    description,
    price,
    image,
    is_available
)
SELECT
    id,
    'Riz au poulet',
    'riz-au-poulet-test',
    'Riz accompagné de poulet préparé à la façon E.M.A.',
    2000,
    NULL,
    FALSE
FROM categories
WHERE slug = 'plats-africains'
AND NOT EXISTS (
    SELECT 1
    FROM products
    WHERE slug = 'riz-au-poulet-test'
);

UPDATE products
SET is_available = FALSE
WHERE slug = 'riz-au-poulet-test';