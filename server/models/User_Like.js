'use strict';
//계속 공유하여 조작하는걸 방지하기 위해 공유하거나 등록할 경우 추가 x
module.exports = function (sequelize, DataTypes) {
    const user_like = sequelize.define("User_Like", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        booktrailerId: {
            field: "booktrailerId",
            type: DataTypes.INTEGER,
            allowNull: null
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "user_like"
        });

    return user_like;
}