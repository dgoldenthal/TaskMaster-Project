// server/models/Log.js

module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('Log', {
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Log;
};
