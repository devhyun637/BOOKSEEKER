'use strict';

module.exports = function (sequelize, DataTypes) {
    const comment = sequelize.define("Comment", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            field: "postId",
            type: DataTypes.INTEGER,
            allowNull: null
        },
        comment: {
            field: "comment",
            type: DataTypes.STRING
        },
        emotion: {
            field: "emotion",
            type: DataTypes.INTEGER,
            allowNull: null
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "comment"
        });

    return comment;
}