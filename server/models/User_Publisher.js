'use strict';

module.exports = function (sequelize, DataTypes) {
    const user_publisher = sequelize.define("User_Publisher", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        publisherId: {
            field: "publisherId",
            type: DataTypes.INTEGER,
            allowNull: null
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "user_publisher"
        });

    return user_publisher;
}