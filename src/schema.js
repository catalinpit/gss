const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Note {
        id: ID!
        title: String!
        content: String!
        username: String!
    }

    type Query {
        notes: [Note]
        note(id: Int): Note 
    }

    type Mutation {
        addNote(id: ID!, title: String!, content: String!, username: String!): Note
    }

    type Subscription {
        noteCreated: Note
    }
`;

module.exports = typeDefs;