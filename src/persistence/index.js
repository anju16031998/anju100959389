// Persistence index: choose sqlite or postgres implementation at runtime
const sqlite = require('./sqlite');
const postgres = require('./postgres');

// Choose postgres if any postgres-related env var is present, otherwise sqlite
const usePostgres = Boolean(
    process.env.POSTGRES_HOST ||
    process.env.POSTGRES_HOST_FILE ||
    process.env.POSTGRES_USER ||
    process.env.POSTGRES_USER_FILE ||
    process.env.POSTGRES_PASSWORD ||
    process.env.POSTGRES_PASSWORD_FILE ||
    process.env.POSTGRES_DB ||
    process.env.POSTGRES_DB_FILE
);

const impl = usePostgres ? postgres : sqlite;

module.exports = {
    init: impl.init,
    teardown: impl.teardown,
    getItems: impl.getItems,
    getItem: impl.getItem,
    storeItem: impl.storeItem,
    updateItem: impl.updateItem,
    removeItem: impl.removeItem,
};