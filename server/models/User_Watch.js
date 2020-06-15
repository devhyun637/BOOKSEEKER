'use strict';

module.exports = function (sequelize, DataTypes) {
    const user_watch = sequelize.define("User_Watch", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        booktrailerId: {
            field: "booktrailerId",
            type: DataTypes.INTEGER,
            allowNull: null,
            primaryKey: true
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "user_watch"
        });

    return user_watch;
}