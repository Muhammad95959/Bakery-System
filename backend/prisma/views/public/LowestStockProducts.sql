SELECT
  name,
  stock
FROM
  products
WHERE
  (deleted = false)
ORDER BY
  stock
LIMIT
  5;
