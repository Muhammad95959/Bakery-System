WITH days AS (
  SELECT
    (
      generate_series(
        (CURRENT_DATE - '6 days' :: INTERVAL),
        (CURRENT_DATE) :: timestamp without time zone,
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
GROUP BY
  d.day
ORDER BY
  d.day;