SELECT
  sum(total) AS revenue
FROM
  orders
WHERE
  (("createdAt") :: date = (now() AT TIME ZONE 'utc')::date);