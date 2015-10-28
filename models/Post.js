module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    descrip: DataTypes.STRING,
    src: DataTypes.STRING,
    author: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Post.belongsTo(models.User);
      }
    }
  });

  return Post;
};