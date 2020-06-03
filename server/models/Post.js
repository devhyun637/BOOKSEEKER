'use strict';

module.exports = function (sequelize, DataTypes) {
    const post = sequelize.define("Post", {
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
        content: {
            field: "content",
            type: DataTypes.STRING,
        },
        like:{
            field: "like",
            type: DataTypes.INTEGER
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "post"
        });

    return post;
}