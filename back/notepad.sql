SELECT
    actions.action_id,
    actions.where_from,
    actions.where_to,
    actions.by_user,
    actions.comment,
    actions.cat_id,
    cats.name AS cat_name
FROM
    actions
    INNER JOIN cats ON actions.cat_id = cats.cat_id;

SELECT
    cats.name,
    actions.timestamp,
    actions.where_to,
    actions.where_from,
    actions.by_user
FROM
    actions
    INNER JOIN cats ON actions.cat_id = cats.cat_id
WHERE
    actions.cat_id = 5
ORDER BY
    timestamp DESC
LIMIT
    1;

SELECT
    where_from
FROM
    actions
WHERE
    cat_id = $ { catId }
ORDER BY
    timestamp DESC
LIMIT