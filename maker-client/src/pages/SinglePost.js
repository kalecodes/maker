import React from 'react';
import { useParams } from 'react-router-dom';



import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';

const SinglePost = () => {
    const { id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="">
                <p>{post.title}</p>
                <p>{post.image}</p>
                <p>{post.description}</p>
                <p>{post.username}</p>
                <p>{post.forSale}</p>
                <p>{post.price}</p>
                <p>{post.sold}</p>
                <p>{post.createdAt}</p>
            </div>
        </div>
    );
};

export default SinglePost;
