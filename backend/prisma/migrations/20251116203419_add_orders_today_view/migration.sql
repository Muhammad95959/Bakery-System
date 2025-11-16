CREATE
OR REPLACE VIEW orders_today AS
SELECT
  COUNT(*)
FROM
  orders
WHERE
  "createdAt"::date = CURRENT_DATE;
