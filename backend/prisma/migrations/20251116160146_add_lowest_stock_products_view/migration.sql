CREATE
OR REPLACE VIEW lowest_stock_products AS
SELECT
  "name",
  "stock"
FROM
  products
WHERE
  deleted = false
ORDER BY
  stock DESC
LIMIT
  5;

