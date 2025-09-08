import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dataBaseVersionResult = await database.query("SHOW server_version;");
  const dataBaseValueVersion = dataBaseVersionResult.rows[0].server_version;

  const dataBaseActiveConnectionsResult = await database.query(
    `SELECT count(*) FROM pg_stat_activity;`,
  );

  const dataBaseValueActiveConnections =
    dataBaseActiveConnectionsResult.rows[0].count;

  console.log(dataBaseValueActiveConnections);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dataBaseValueVersion,
        active_connections: parseInt(dataBaseValueActiveConnections),
      },
    },
  });
}

export default status;
