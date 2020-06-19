'use strict';

module.exports = function (sequelize, DataTypes) {
    const booktrailerQuiz = sequelize.define("BooktrailerQuiz", {
        userId: {
            field: "userId",
            type: DataTypes.INTEGER,
            allowNull: false
        },
        booktrailerId: {
            field: "booktrailerId",
            type: DataTypes.INTEGER,
            allowNull: null
        },
        question: {
            field: "question",
            type: DataTypes.STRING,
            allowNull: null
        },
        answer: {
            field: "answer",
            type: DataTypes.STRING,
            allowNull: null
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "booktrailerQuiz"
        });

    return booktrailerQuiz;
}