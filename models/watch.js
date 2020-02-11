module.exports = function (sequelize, DataTypes) {
    var NewMedia = sequelize.define("NewMedia", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        genre: {
            type: DataTypes.STRING,
            defaultValue: "Comedy"
        },
        mediaType: {
            type: DataTypes.STRING,
            defaultValue: "Movie"
        },
        watched: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return NewMedia;
};
