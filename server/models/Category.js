'use strict';

module.exports = function (sequelize, DataTypes) {
    const category = sequelize.define("Category", {
        categoryName: {
            field: "categoryName",
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        counting: {
            field: "counting",
            type: DataTypes.INTEGER,
            allowNull: null
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "category_id"
        });

    return category;
}