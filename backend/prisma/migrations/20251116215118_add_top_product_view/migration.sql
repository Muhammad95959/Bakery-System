CREATE
OR REPLACE VIEW top_product AS
SELECT
  p.name
FROM
  order_items i
  JOIN products p ON p.id = i."productId"
WHERE
  i."createdAt"::date = CURRENT_DATE
GROUP BY
  p.id
ORDER BY
  SUM(i.quantity) DESC
LIMIT
  1;
