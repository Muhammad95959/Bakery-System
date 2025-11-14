CREATE
OR REPLACE VIEW cart_view AS
SELECT
  o."orderId",
  p."name",
  p."price",
  o."quantity"
FROM
  order_items o
  JOIN products p ON p.id = o."productId";
