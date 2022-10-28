const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        userName: String!
        email: String!
        password: String
        createdAt: String!
    }
        
    input UserInput {
        userName: String!
        email: String!
        password: String!
    }

    type Login {    
        userName:String!
        email: String!
        password: String!
    }
    
    type File {
        _id: ID!
        path: String!
        filename: String!
        mimetype: String!
        encoding: String!
    }

    input LoginInput {
        userName:String!
        email: String!
        password: String!
    }
    
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type Query {
        users:[User!]!
        login(userName:String!, email:String!, password:String!): AuthData!     
    }

    type Mutation {
        createUser(userInput:UserInput): User
    }

    schema {
        query: Query
        mutation: Mutation
    }
`);
