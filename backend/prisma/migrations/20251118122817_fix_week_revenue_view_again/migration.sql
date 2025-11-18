CREATE
OR REPLACE VIEW week_revenue AS
WITH days AS (
  SELECT
    generate_series(
      (now() AT TIME ZONE 'utc')::date - INTERVAL '6 days',
      (now() AT TIME ZONE 'utc')::date,
      INTERVAL '1 day'
    )::date AS day
)
SELECT
  to_char(d.day, 'Dy') AS day,
  COALESCE(SUM(o.total), 0) AS revenue
FROM days d
LEFT JOIN orders o 
  ON o."createdAt"::date = d.day
  AND o.status != 'CANCELED'
GROUP BY d.day
ORDER BY d.day;
