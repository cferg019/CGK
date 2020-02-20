require('dotenv').config();  // this line is important!
module.exports = {
    "development": {
        "username": process.env.LOCAL_USERNAME,
        "password": process.env.LOCAL_PASSWORD,
        "database": process.env.LOCAL_DB,
        "host": "127.0.0.1",
        "dialect": "mysql",
        "migrationStorageTableName": "sequelize_meta"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "operatorsAliases": false
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "operatorsAliases": false
    }
}

