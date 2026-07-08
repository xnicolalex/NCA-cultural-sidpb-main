#!/bin/sh
set -eu

echo "Iniciando bootstrap dos bancos do NCA..."

: "${POSTGRES_USER:?POSTGRES_USER não definido}"
: "${SIDPB_DB_USER:?SIDPB_DB_USER não definido}"
: "${SIDPB_DB_PASSWORD:?SIDPB_DB_PASSWORD não definido}"
: "${CULTURA_DB_USER:?CULTURA_DB_USER não definido}"
: "${CULTURA_DB_PASSWORD:?CULTURA_DB_PASSWORD não definido}"

echo "Criando roles e bancos, se ainda não existirem..."

psql -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname postgres \
  -v sidpb_user="$SIDPB_DB_USER" \
  -v sidpb_password="$SIDPB_DB_PASSWORD" \
  -v cultura_user="$CULTURA_DB_USER" \
  -v cultura_password="$CULTURA_DB_PASSWORD" <<'EOSQL'

SELECT format('CREATE ROLE %I LOGIN PASSWORD %L', :'sidpb_user', :'sidpb_password')
WHERE NOT EXISTS (
  SELECT 1 FROM pg_roles WHERE rolname = :'sidpb_user'
)
\gexec

SELECT format('CREATE ROLE %I LOGIN PASSWORD %L', :'cultura_user', :'cultura_password')
WHERE NOT EXISTS (
  SELECT 1 FROM pg_roles WHERE rolname = :'cultura_user'
)
\gexec

SELECT format('CREATE DATABASE %I OWNER %I', 'db_sidpb', :'sidpb_user')
WHERE NOT EXISTS (
  SELECT 1 FROM pg_database WHERE datname = 'db_sidpb'
)
\gexec

SELECT format('CREATE DATABASE %I OWNER %I', 'db_cultura', :'cultura_user')
WHERE NOT EXISTS (
  SELECT 1 FROM pg_database WHERE datname = 'db_cultura'
)
\gexec

EOSQL

echo "Configurando permissões do banco db_sidpb..."

psql -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname db_sidpb \
  -v sidpb_user="$SIDPB_DB_USER" <<'EOSQL'

GRANT ALL PRIVILEGES ON DATABASE db_sidpb TO :"sidpb_user";
GRANT USAGE, CREATE ON SCHEMA public TO :"sidpb_user";
ALTER SCHEMA public OWNER TO :"sidpb_user";

-- PostGIS NÃO será ativado nesta versão.
-- Quando o SIDPB realmente usar PostGIS, ative por migration Flyway:
-- CREATE EXTENSION IF NOT EXISTS postgis;

EOSQL

echo "Configurando permissões do banco db_cultura..."

psql -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname db_cultura \
  -v cultura_user="$CULTURA_DB_USER" <<'EOSQL'

GRANT ALL PRIVILEGES ON DATABASE db_cultura TO :"cultura_user";
GRANT USAGE, CREATE ON SCHEMA public TO :"cultura_user";
ALTER SCHEMA public OWNER TO :"cultura_user";

-- PostGIS NÃO será ativado nesta versão.
-- Caso o sistema cultural precise futuramente, ative por migration/script controlado:
-- CREATE EXTENSION IF NOT EXISTS postgis;

EOSQL

echo "Bootstrap dos bancos finalizado com sucesso."