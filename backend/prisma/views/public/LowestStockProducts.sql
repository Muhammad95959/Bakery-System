SELECT
  name,
  stock
FROM
  products
WHERE
  (deleted = false)
ORDER BY
  stock DESC
LIMIT
  5;