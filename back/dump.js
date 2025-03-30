const dump = require("./dump_kavout_09-02-2025.json");
const Pool = require("pg").Pool;

const config = {
  host: process.env.DB_HOST,
  database: "kazh",
  user: "postgres",
  password: "postgres",
  port: 5432,
};
const pool = new Pool(config);

const allInserts = dump.slice(-10).map((line) => {
  const {
    action_id,
    cat_id,
    comment,
    timestamp,
    where_from,
    where_to,
    by_user,
  } = line;

  return `('${action_id}', '${cat_id}', '${timestamp}', '${where_from}', '${where_to}', '${by_user}', '${comment}')`;
});

const insertQuery = `INSERT INTO actions (action_id, cat_id, timestamp, where_from, where_to, by_user, comment) VALUES `;
console.log(insertQuery + allInserts.join(", ") + ";");
// pool.query(insertQuery + allInserts.join(", "));
