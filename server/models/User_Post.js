'use strict';

module.exports = function (sequelize, DataTypes) {
    const user_post = sequelize.define("User_Post", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        postId: {
            field: "postId",
            type: DataTypes.INTEGER,
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