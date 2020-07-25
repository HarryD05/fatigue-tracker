const dayResolver = require("./day"); //Or auth
const logResolver = require("./log");

const rootResolver = {
  ...dayResolver,
  ...logResolver,
};

module.exports = rootResolver;
