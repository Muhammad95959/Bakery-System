CREATE
OR REPLACE VIEW week_revenue AS
WITH days AS (
  SELECT generate_series(
    CURRENT_DATE - INTERVAL '6 days',
    CURRENT_DATE,
    '1 day'
  )::date AS day
)
SELECT 
  TO_CHAR(d.day, 'Dy') AS day,
  COALESCE(SUM(o.total), 0) AS revenue
FROM days d
LEFT JOIN orders o
  ON o."createdAt"::date = d.day
GROUP BY d.day
ORDER BY d.day;
