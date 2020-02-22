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
        },
        rating: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        posterUrl: {
            type: DataTypes.STRING,
            defaultValue: "https://media.istockphoto.com/photos/popcorn-in-red-and-white-cardboard-box-is-shaking-picture-id519080140?k=6&m=519080140&s=612x612&w=0&h=3C1PBEsJK_vAP3hdtbyUS7pGGcf-gx1PQm5zoG4jY0I="
        },
        year: {
            type: DataTypes.STRING,
            defaultValue: ""
        }
    });

    NewMedia.associate = function (models) {
        NewMedia.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return NewMedia;
};
