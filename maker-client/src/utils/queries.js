import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            image
            isArtist
            posts {
                _id
                title
                image
                description
                forSale
                price
                sold
                createdAt
            }
            favorites {
                _id
                username
                image
                isArtist
                posts {
                    _id
                    title
                    image
                    description
                    forSale
                    price
                    sold
                    createdAt
                }
            }
            likes {
                _id
                title
                image
                description
                username
                forSale
                price
                sold
                createdAt
            }
            saves {
                _id
                title
                image
                description
                username
                forSale
                price
                sold
                createdAt
            }
        }
    }
`;

export const QUERY_USERS = gql`
    users {
        _id
        username
        image
        isArtist
        posts {
            _id
            title
            image
            description
            forSale
            price
            sold
            createdAt
        }
    }
`;

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            image
            isArtist
            posts {
                _id
                title
                image
                description
                forSale
                price
                sold
                createdAt
            }
        }
    }
`;

export const QUERY_POSTS = gql`
    query posts($username: String) {
        posts(username: $username) {
            _id
            title
            image
            description
            username
            forSale
            price
            sold
            createdAt
        }
    }
`;

export const QUERY_THOUGHT = gql`
    query post($id: ID!) {
        post(_id: $id) {
            _id
            title
            image
            description
            username
            forSale
            price
            sold
            createdAt
            comments {
                _id
                commentBody
                username
                createdAt
            }
        }
    }
`;