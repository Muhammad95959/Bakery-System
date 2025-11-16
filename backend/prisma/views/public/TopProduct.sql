SELECT
  p.name
FROM
  order_items i
  JOIN products p ON p.id = i."productId"
WHERE
  i."createdAt" :: date = (now() AT TIME ZONE 'utc')::date
GROUP BY
  p.id
ORDER BY
  SUM(i.quantity) DESC
LIMIT
  1;