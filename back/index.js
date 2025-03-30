const express = require("express");

const app = express();
const p = 3000;
const cors = require("cors");
const path = require("node:path");

const Pool = require("pg").Pool;
app.use(express.json()); // to support JSON-encoded bodies

const config = {
  host: process.env.DB_HOST,
  database: "kazh",
  user: "postgres",
  password: "postgres",
  port: 5432,
};
const pool = new Pool(config);

app.use(
  cors({
    origin: process.env.APP_URL, // Allow requests from this origin
  }),
  express.static("public")
);

app.get("/api/actions", (req, res) => {
  pool.query(
    `SELECT
    actions.action_id,
    actions.where_from,
    actions.where_to,
    actions.timestamp,
    actions.by_user,
    actions.comment,
    actions.cat_id,
    cats.name AS cat_name
  FROM
    actions
    INNER JOIN cats ON actions.cat_id = cats.cat_id;
    `,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

app.post("/api/action", async (req, res) => {
  console.log(`POST /action`);
  const client = await pool.connect();

  const { cat_id, where_to, by_user, timestamp } = req.body;

  const whereFromQuery = `
        SELECT where_to
        FROM actions
        WHERE cat_id = ${cat_id}
        ORDER BY timestamp DESC
        LIMIT 1`;

  pool.query(whereFromQuery, async (error, results) => {
    if (error) {
      throw error;
    }
    const where_from = results.rows[0].where_to;

    const insertQuery = `
    INSERT INTO actions (cat_id, timestamp, where_from, where_to, by_user)
    
    VALUES (${cat_id}, '${timestamp}', '${where_from}', '${where_to}', '${by_user}')
    
    RETURNING action_id;`;
    let action_id;

    try {
      await client.query("BEGIN");
      const queryResult = await client.query(insertQuery);
      await client.query("COMMIT");

      action_id = queryResult.rows[0].action_id;
    } catch (e) {
      console.error("error with query", e);
      res.status(400).json(e);
    } finally {
      client.release();
      console.log(
        "New action inserted with ID:",
        action_id,
        `(${cat_id}, '${timestamp}', '${where_from}', '${where_to}', '${by_user}')`
      );
      res.status(200).json(action_id);
    }
  });
});

app.get("/api/cats", (req, res) => {
  console.log(`GET /cats`);

  pool.query("SELECT * FROM cats", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.get("/api/state/:id", (req, res) => {
  const catId = req.params.id;
  console.log(`GET /state/${catId}`);

  pool.query(
    `SELECT
    cats.name,
    actions.timestamp,
    actions.where_to,
    actions.where_from,
    actions.by_user
    FROM
    actions
    INNER JOIN cats ON actions.cat_id = cats.cat_id
    WHERE
    actions.cat_id = ${catId}
    ORDER BY
    timestamp DESC
    LIMIT
    1;`,
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows[0]);
    }
  );
});
app.get("*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(p, () => {
  console.log(`
    
    /\\_____/\\                                                /\\_____/\\
   /  o   o  \\                                              /  o   o  \\
  ( ==  ^  == )                                            ( ==  ^  == )
   )         (     KAVOUT KAZH listening on port ${p}       )         (
  (           )                                            (           )
 ( (  )   (  ) )                                          ( (  )   (  ) )
(__(__)___(__)__)                                        (__(__)___(__)__)

  
    `);
});
