const { User, Post } = require("../models");

Post.belongsTo(User, { foreignKey: "userId" });
