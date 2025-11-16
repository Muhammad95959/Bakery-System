CREATE OR REPLACE VIEW orders_today AS
SELECT
  count(*) AS count
FROM
  orders
WHERE
  (("createdAt") :: date = (now() AT TIME ZONE 'utc')::date);

CREATE OR REPLACE VIEW revenue_today AS
SELECT
  sum(total) AS revenue
FROM
  orders
WHERE
  (("createdAt") :: date = (now() AT TIME ZONE 'utc')::date);

CREATE OR REPLACE VIEW top_product AS
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

CREATE OR REPLACE VIEW week_revenue AS
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
GROUP BY
  d.day
ORDER BY
  d.day;
