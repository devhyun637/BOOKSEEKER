'use strict';

module.exports = function (sequelize, DataTypes) {
    const review = sequelize.define("Review", {
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
        },
        review: {
            field: "review",
            type: DataTypes.STRING(255)
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "review"
        });

    return review;
}