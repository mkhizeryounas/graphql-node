const express = require("express");
var logger = require("morgan");

const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();
app.use(logger("dev"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(process.env.PORT || 3000, () =>
  console.log("🖥 ", "Server is up and listening now.")
);
