const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        _id: ID!
        firstname: String!
        lastname: String!
        email: String!
        password: String
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: String!
    }

    input UserInput {
        email: String!
        password: String!
        firstname: String!
        lastname: String!
    }

    type RootQuery {
        users: [User!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);