'use strict';

module.exports = function (sequelize, DataTypes) {
    const hashtag = sequelize.define("Hashtag", {
        hashtagName: {
            field: "hashtagName",
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        counting: {
            field: "counting",
            type: DataTypes.INTEGER,
            allowNull: null
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "hashtag"
        });

    return hashtag;
}