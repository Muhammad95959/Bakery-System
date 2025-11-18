CREATE
OR REPLACE VIEW week_revenue AS
WITH days AS (
  SELECT
    (
      generate_series(
        ((now() AT TIME ZONE 'utc')::date - '6 days' :: INTERVAL),
        ((now() AT TIME ZONE 'utc')::date),
        '1 day' :: INTERVAL
      )
    ) :: date AS DAY
)
SELECT
  to_char((d.day) :: timestamp WITH time zone, 'Dy' :: text) AS DAY,
  COALESCE(sum(o.total), (0) :: numeric) AS revenue
FROM
  (
    days d
    LEFT JOIN orders o ON (((o."createdAt") :: date = d.day))
  )
WHERE 
  o.status != 'CANCELED'
GROUP BY
  d.day
ORDER BY
  d.day;
