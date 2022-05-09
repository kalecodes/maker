import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username 
                email
                image
                isArtist
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!, $image: String, $bio: String, $isArtist: Boolean) {
        addUser(username: $username, email: $email, password: $password, image: $image, bio: $bio, isArtist: $isArtist) {
            token
            user {
                _id
                username
                email
                image
                isArtist
            }
        }
    }
`;

export const ADD_POST = gql`
    mutation addPost($image: String!, $title: String, $description: String, $forSale: Boolean, $price: Float) {
        addPost(image: $image, title: $title, description: $description, forSale: $forSale, price: $price) {
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

export const ADD_COMMENT = gql`
    mutation addComment($postId: ID!, $commentBody: String!) {
        addComment(postId: $postId, commentBody: $commentBody) {
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

export const ADD_SAVE = gql`
    mutation addSave($id: ID!) {
        addSave(postId: $id) {
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

export const ADD_FAV = gql`
    mutation addFav($id: ID!) {
        addFav(favId: $id) {
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