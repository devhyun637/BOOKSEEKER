'use strict';

module.exports = function (sequelize, DataTypes) {
    const bookTrailer = sequelize.define("BookTrailer", {
        title: {
            field: "title",
            type: DataTypes.STRING(255),
            allowNull: false
        },
        author: {
            field: "author",
            type: DataTypes.STRING(255)
        },
        content: {
            field: "content",
            type: DataTypes.STRING(255),
            allowNull: false
        },
        likeCount: {
            field: "likeCount",
            type: DataTypes.INTEGER,
            allowNull: null
        },
        URL: {
            field: "URL",
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "booktrailer"
        });

    return bookTrailer;
}