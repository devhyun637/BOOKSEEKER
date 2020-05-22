'use strict';

module.exports = function (sequelize, DataTypes) {
    const user_trailer = sequelize.define("User_Trailer", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trailerId: {
            field: "trailerId",
            type: DataTypes.INTEGER,
            allowNull: null
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "user_trailer"
        });

    return user_trailer;
}