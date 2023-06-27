const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Post extends Model {}
  Post.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      content: DataTypes.TEXT,
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
    }
  );
  return Post;
};
