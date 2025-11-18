CREATE
OR REPLACE VIEW top_product AS
SELECT
  p.name
FROM
  order_items i
  JOIN products p ON p.id = i."productId"
  JOIN orders o ON o.id = i."orderId"
WHERE
  i."createdAt" :: date = (now () AT TIME ZONE 'utc')::date
  AND o.status != 'CANCELED'
GROUP BY
  p.id
ORDER BY
  SUM(i.quantity) DESC
LIMIT
  1;
