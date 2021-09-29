const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    users: [User]
    userByID(_id: String!): [User!]!
    issues: [Issue]
    issueById(_id: String!): [Issue!]!
    userByName(username: String!): [User!]!
  }
  type User {
    username: String!
    password: String!
    admin: Boolean!
    _id: Int!
  }
  type Issue {
    title: String!
    description: String!
    upvote: Int!
    downvote: Int!
    userID: String!
    comments: [String]
    voted: [String]
  }
  type Mutation {
    createUser(
      username: String!
      password: String!
      admin: Boolean!
      _id: String!
    ): User!
    createIssue(
      title: String!
      description: String!
      upvote: Int!
      downvote: Int!
      userID: String!
    ): Issue!
    deleteUser(_id: String!): Boolean
    deleteIssue(_id: String!): Boolean
    commentIssue(_id: String!, comment: String): Boolean
    upvote(_id: String!, vote: Int!, userID:String!): Boolean
  }
`;
module.exports = typeDefs;
