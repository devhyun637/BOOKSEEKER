'use strict';

module.exports = function (sequelize, DataTypes) {
    const user_category = sequelize.define("User_Category", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        categoryId: {
            field: "categoryId",
            type: DataTypes.INTEGER,
            allowNull: null,
            primaryKey: true
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "user_category"
        });

    return user_category;
}