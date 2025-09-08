import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  var pgStatement = await database.query(
    `SELECT 
      version() as versao,
      (SELECT COUNT(*) FROM pg_stat_activity) AS conexoes_abertas,
      (SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active') as conexoes_ativas,
      current_setting('max_connections')::int AS conexoes_maximas;
    `,
  );

  var dados = pgStatement.rows[0];
  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: dados.versao,
    active_connections: parseInt(dados.conexoes_ativas),
    opened_connections: parseInt(dados.conexoes_abertas),
    max_connections: dados.conexoes_maximas,
  });
}

export default status;
