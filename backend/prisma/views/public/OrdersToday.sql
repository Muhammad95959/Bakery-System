SELECT
  count(*) AS count
FROM
  orders
WHERE
  (("createdAt") :: date = CURRENT_DATE);