import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dataBaseVersionResult = await database.query("SHOW server_version;");
  const dataBaseValueVersion = dataBaseVersionResult.rows[0].server_version;

  const dataBaseMaxConnectionResult = await database.query("SHOW max_connections;");  
  const dataBaseValueMaxConnections = dataBaseMaxConnectionResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;

  const databaseOpenedConnectionsResult = 
    await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName]      
    });

  const databaseValueOpenedConnections = databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: dataBaseValueVersion,
        max_connections: parseInt(dataBaseValueMaxConnections),
        opened_connections: databaseValueOpenedConnections,
      },
    },
  });
}

export default status;
