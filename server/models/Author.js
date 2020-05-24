'use strict';

module.exports = function (sequelize, DataTypes) {
    const author = sequelize.define("Author", {
        author: {
            field: "author",
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "author"
        });

    return author;
}