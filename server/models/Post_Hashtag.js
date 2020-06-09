'use strict';

module.exports = function (sequelize, DataTypes) {
    const post_hashtag = sequelize.define("Post_Hashtag", {
        postId: {
            field: "postId",
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        hashtagId: {
            field: "hashtagId",
            type: DataTypes.INTEGER,
            allowNull: null,
            primaryKey: true
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "post_hashtag"
        });

    return post_hashtag;
}