module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define("post", {
    descrip: DataTypes.STRING,
    src: DataTypes.STRING,
    author: DataTypes.STRING
  }
  //    , {
  //  classMethods: {
  //    associate: function(models) {
  //      post.belongsTo(models.user);
  //    }
  //  }
  //}
  );

  return post;
};