'use strict';

module.exports = function (sequelize, DataTypes) {
    const user = sequelize.define("User", {
        userID: {
            field: "email",
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        password: {
            field: "password",
            type: DataTypes.STRING(255),
            allowNull: false
        },
        salt: {
            field: "salt",
            type: DataTypes.STRING(255),
            allowNull: false
        },
        name: {
            field: "name",
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false
        },
        image_profile: {
            field: "image_profile",
            type: DataTypes.STRING(255)
        },
        age: {
            field: "age",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            field: "gender",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        roleId: {
            field: "roleId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        score: {
            field: "score",
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "users"
        });

    return user;
}