'use strict';

module.exports = function (sequelize, DataTypes) {
    const trailer_hashtag = sequelize.define("trailer_hashtag", {
        booktrailerId: {
            field: "booktrailerId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hashtagId: {
            field: "hashtagId",
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