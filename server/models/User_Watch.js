'use strict';

module.exports = function (sequelize, DataTypes) {
    const user_watch = sequelize.define("user_watch", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        booktrailerId: {
            field: "booktrailerId",
            type: DataTypes.INTEGER,
            unique: true,
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