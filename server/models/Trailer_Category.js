'use strict';

module.exports = function (sequelize, DataTypes) {
    const trailer_category = sequelize.define("Trailer_Category", {
        userId: {
            field: "trailerId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hashtagId: {
            field: "categoryId",
            type: DataTypes.INTEGER,
            allowNull: null
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "trailer_category"
        });

    return trailer_category;
}