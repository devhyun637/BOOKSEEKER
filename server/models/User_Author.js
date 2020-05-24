'use strict';

module.exports = function (sequelize, DataTypes) {
    const user_author = sequelize.define("User_Author", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        authorId: {
            field: "authorId",
            type: DataTypes.INTEGER,
            allowNull: null
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "user_author"
        });

    return user_author;
}