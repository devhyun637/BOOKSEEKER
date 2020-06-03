'use strict';

module.exports = function (sequelize, DataTypes) {
    const booktrailerQuiz = sequelize.define("booktrailerQuiz", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        booktrailerId: {
            field: "booktrailerId",
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: null
        },
        question: {
            field: "question",
            type: DataTypes.STRING,
            allowNull: null
        },
        answer: {
            field: "answer",
            type: DataTypes.INTEGER,
            allowNull: null
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "booktrailerQuiz"
        });

    return booktrailerQuiz;
}