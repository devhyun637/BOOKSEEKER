'use strict';

module.exports = function (sequelize, DataTypes) {
    const publisher = sequelize.define("Publisher", {
        publisher: {
            field: "publisher",
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        }
    }, {
            underscored: true,
            freezeTalbeName: true,
            tableName: "publisher"
        });

    return publisher;
}