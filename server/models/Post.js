'use strict';

module.exports = function (sequelize, DataTypes) {
    const post = sequelize.define("Post", {
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
        content: {
            field: "content",
            type: DataTypes.STRING,
        },
        likeCount:{
            field: "likeCount",
            type: DataTypes.INTEGER
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "post"
        });

    return post;
}