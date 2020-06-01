'use strict';

module.exports = function (sequelize, DataTypes) {
    const follow = sequelize.define("Follow", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        friendId: {
            field: "friendId",
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: null,
            primaryKey: true
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "Follow"
        });

    return follow;
}