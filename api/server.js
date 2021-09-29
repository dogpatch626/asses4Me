const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const uuid = require('uuidv4')
const { ApolloServer, gql } = require("apollo-server-express");
const resolvers = require("./resolvers/resolver");
const typeDefs = require("./typedefs/typeDefs");
const router = require('./routes/router')
var app = express();
const startServer = async () => {
  
  
  app.use(express.json());
  app.use(cors());

  await mongoose
    .connect(process.env.MONGO_CONNECTION)
    .then(() => {
      console.log("Mongo Connected");
    })
    .catch((err) => {
      console.log("something went wrong : ", err);
    });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  await server.start();
  server.applyMiddleware({ app });
  app.route('/')
  .get(router)


  app.route('/user')
  .get(router)
  .post(router)
  
  app.route('/issue')
  .get(router)
  .post(router)

  app.route('/user/:id')
  .get(router)
  .delete(router)

  app.route('/issue/:id')
  .get(router)
  .delete(router)
  .put(router)
  
  app.route('/login')
  .post(router)

  app.route('/vote')
  .put(router)

  module.exports =app; 
  app.listen(4000, () => {
    console.log(`app is listening at port 4000${server.graphqlPath}`);
  });
};

startServer();

module.exports=app;
