#!/bin/sh
set -e

echo "Running database migrations..."
if ! npm run migration:run; then
    echo "ERROR: Database migration failed!"
    echo "Please check the database connection and migration files."
    exit 1
fi

echo "Migrations completed successfully."
echo "Starting application..."
exec npm run start:prod
