SELECT
  sum(total) AS revenue
FROM
  orders
WHERE
  (("createdAt") :: date = CURRENT_DATE);