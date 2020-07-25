//SETTING UP LIBRARIES
const express = require("express");
const mongoose = require("mongoose"); //For databases
const { graphqlHTTP } = require("express-graphql");

require("dotenv").config(); //.env file

//IMPORTING FROM OTHER FILES
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

//SET UP EXPRESS
const app = express();
app.use(express.json());

//SETTING UP GRAPHQL
//the ! means it can't be null (required)
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

//SETTING UP MONGOOSE
console.log("Connecting to MongoDB");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //SETTING UP SERVER
    console.log("Starting server");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });