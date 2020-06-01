'use strict';

module.exports = function (sequelize, DataTypes) {
    const user_quiz = sequelize.define("user_quiz", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        quizId: {
            field: "quizId",
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: null,
            primaryKey: true
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "user_quiz"
        });

    return user_quiz;
}