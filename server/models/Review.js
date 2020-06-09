'use strict';

module.exports = function (sequelize, DataTypes) {
    const review = sequelize.define("Review", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        booktrailerId: {
            field: "booktrailerId",
            type: DataTypes.INTEGER,
            allowNull: null
        },
        review: {
            field: "review",
            type: DataTypes.TEXT
        },
        emotion: {
            field: "emotion",
            type: DataTypes.INTEGER,
            allowNull: null
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "review"
        });

    return review;
}