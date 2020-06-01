'use strict';

module.exports = function (sequelize, DataTypes) {
    const bookTrailer = sequelize.define("BookTrailer", {
        title: {
            field: "title",
            type: DataTypes.STRING(255),
            allowNull: false
        },
        thumbnail: {
            field: "thumbnail",
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
        },
        categoryId: {
            field: "categoryId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bookTitle: {
            field: "bookTitle",
            type: DataTypes.STRING(255),
            allowNull: false
        },
        bookPublisher: {
            field: "bookPublisher",
            type: DataTypes.STRING(255),
            allowNull: false
        },
        watch: {
            field: "watch",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            field: "userId",
            type:DataTypes.INTEGER,
            allowNull: false
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "booktrailer"
        });

    return bookTrailer;
}