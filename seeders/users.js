module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        name: "Ali Şen",
        username: "ali",
        email: "hello@alisen.me",
        password:
          "$2b$10$JcYD25K8elUYPPmUt78JWevplgFUa9ZsMchF7Yypm1iKETeRzD/XC",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
