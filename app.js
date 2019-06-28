const express = require("express");
const logger = require("morgan");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");

const schema = require("./schema/schema");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// allow cross-origin requests
app.use(cors());

// connect to mlab database
mongoose.connect(
  "mongodb://mkhizeryounas:Stirling123@ds033797.mlab.com:33797/graphql-node",
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("💾 ", "Conneted to database");
});

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
