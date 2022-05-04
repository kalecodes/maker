const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
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
        _id: ID!
        image: String
        titel: String
        description: String
        postedBy: User
        forSale: Boolean
        price: Float
        sold: Boolean
        createdAt: String
        likedBy: [User]
        comments: [Comment]
        savedBy: [User]
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
        addUser(username: String!, email: String!, password: String!): Auth
        addPost(image: String!): Post
        addLike(postId: ID!): Post
        addComment(postId: ID!, commentBody: String!): Post
        addSave(postId: ID!): Post
        addFavorite(favId: ID!): User
    }
`;

module.exports = typeDefs;