'use strict';

module.exports = function (sequelize, DataTypes) {
    const role = sequelize.define("role", {
        roleName: {
            field: "roleName",
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "role"
        });

    return role;
}