require("dotenv").config();
const { authController } = require("./controllers");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const express = require("express");
const PORT = process.env.PORT || 3005;
const app = express();
require("./config/associations");
const { sequelize } = require("./models");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/post", postRoutes);

app.get("/", function (req, res) {
  res.json({
    status: false,
    message: "Hello World!",
  });
});

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} is running`);
  });
});
