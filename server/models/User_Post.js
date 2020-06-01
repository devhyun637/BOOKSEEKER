'use strict';

module.exports = function (sequelize, DataTypes) {
    const user_post = sequelize.define("user_post", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        postId: {
            field: "postId",
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: null,
            primaryKey: true
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "user_post"
        });

    return user_post;
}