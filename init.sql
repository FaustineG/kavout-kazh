CREATE TABLE cats (cat_id SERIAL PRIMARY KEY, name TEXT);

CREATE TABLE actions (
    action_id SERIAL PRIMARY KEY,
    cat_id INT REFERENCES cats(cat_id),
    timestamp TIMESTAMP,
    where_to TEXT,
    where_from TEXT,
    by_user TEXT,
    comment TEXT
);

INSERT INTO
    cats (name)
VALUES
    ('Pignouf');

INSERT INTO
    cats (name)
VALUES
    ('Finn');

INSERT INTO
    actions (
        cat_id,
        timestamp,
        where_from,
        where_to,
        by_user,
        comment
    )
VALUES
    (
        1,
        '2024-09-12 13:00:45.224',
        'outside',
        'inside',
        'Mum',
        ''
    );

INSERT INTO
    actions (
        cat_id,
        timestamp,
        where_from,
        where_to,
        by_user,
        comment
    )
VALUES
    (
        2,
        '2024-09-12 13:00:45.224',
        'chambre papa et maman',
        'outside',
        'Mum',
        ''
    );