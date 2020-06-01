'use strict';

module.exports = function (sequelize, DataTypes) {
    const user_like = sequelize.define("user_like", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        booktrailerId: {
            field: "booktrailerId",
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: null
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "user_like"
        });

    return user_like;
}