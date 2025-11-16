SELECT
  count(*) AS count
FROM
  orders
WHERE
  (("createdAt") :: date = (now() AT TIME ZONE 'utc')::date);