const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        image: String
        isArtist: Boolean!
        posts: [Post]
        favorites: [User]
        likes: [Post]
        saves: [Post]
    }

    type Post {
        _id: ID
        title: String
        image: String
        description: String
        username: String
        forSale: Boolean
        price: Float
        sold: Boolean
        createdAt: String
        likes: [User]
        comments: [Comment]
        saves: [User]
    }

    type Comment {
        _id: ID
        commentBody: String
        username: String
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        posts(username: String): [Post]
        post(_id: ID!): Post
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, isArtist: Boolean!): Auth
        addPost(image: String!): Post
        addLike(postId: ID!): Post
        addComment(postId: ID!, commentBody: String!): Post
        addSave(postId: ID!): Post
        addFav(favId: ID!): User
    }
`;

module.exports = typeDefs;