#!/usr/bin/env bash
set -euo pipefail

psql -v ON_ERROR_STOP=1 "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
     CREATE USER rawpotion_backend;
     ALTER USER rawpotion_backend PASSWORD '$RAWPOTION_MEALS_POSTGRES_USER_PASSWORD';
     CREATE DATABASE rawpotion_meals;
     GRANT ALL PRIVILEGES ON DATABASE rawpotion_meals TO rawpotion_backend;
EOSQL
