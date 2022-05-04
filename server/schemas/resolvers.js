const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: {

        },
        users: {

        },
        user: {
            
        },
        posts: {

        },
        post: {

        }
    },
    Mutation: {
        addUser: {

        },
        login: {

        },
        addPost: {

        },
        addLike: {
            
        },
        addComment: {

        },
        addSave: {

        },
        addFavorite: {
            
        }
    }
};

module.exports = resolvers;