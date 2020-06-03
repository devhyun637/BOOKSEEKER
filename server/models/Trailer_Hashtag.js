'use strict';

module.exports = function (sequelize, DataTypes) {
    const trailer_hashtag = sequelize.define("Trailer_Hashtag", {
        booktrailerId: {
            field: "booktrailerId",
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        hashtagId: {
            field: "hashtagId",
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        counting: {
            field: "counting",
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "trailer_hashtag"
        });

    return trailer_hashtag;
}