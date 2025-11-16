CREATE
OR REPLACE VIEW revenue_today AS
SELECT
  SUM(total) AS revenue
FROM
  orders
WHERE
  "createdAt"::date = CURRENT_DATE;
