import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';

import { Image, Segment, Header, Comment, Form, Button } from 'semantic-ui-react';

const SinglePost = () => {
    const { id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });

    const post = data?.post || {};
    const comments = data?.post.comments || {};

    if (loading) {
        return <Segment loading/>
    }

    return (
        <div>
            <Segment padded="very" className="">
                <Image size="large" src={post.image} centered/>
                <Header size="huge">{post.title}</Header>
                <Header size="medium">Posted by: {` ` + post.username}</Header>
                <Link to={`/profile/${post.username}`}>
                    <Button content="View Artist Profile" labelPosition='left' icon='edit' secondary/>
                </Link>
                <p>{post.description}</p>
                {post.forSale && (
                    <>
                        <Header size="small">This item is for sale!</Header>
                        <Header size="small">{`Price: $` + post.price}</Header>
                    </>
                )}
                {post.sold && (
                    <Header size="small">This item sold for ${post.price}</Header>
                )}
                <p>Posted: {` ` + post.createdAt}</p>
            </Segment>
            <Comment.Group>
                <Form 
                    // onSubmit={handleFormSubmit}
                >
                    <Form.TextArea 
                        placeholder="You are so talented!"
                        required
                        id="comment"
                        name="comment"
                        rows="2"
                        // value={formState.commentBody}
                        // onChange={handleChange}
                    />
                    <Button content='Add Comment' type='submit' labelPosition='left' icon='edit' primary/>
                </Form>
                {comments.length === 0 ? (
                     <Segment padded="very" className="mb-5">
                         <Comment>
                            <Comment.Avatar/>
                            <Comment.Content>
                                <Comment.Text>Be the first to comment!</Comment.Text>
                            </Comment.Content>    
                         </Comment>
                    </Segment>
                ) : (
                    <Segment padded="very">
                        {comments &&
                            comments.map(comment => (
                                <Comment key={comment._id}>
                                    <Comment.Avatar/>
                                    <Comment.Content>
                                        <Comment.Author>{comment.username}</Comment.Author>
                                        <Comment.Metadata>{comment.createdAt}</Comment.Metadata>
                                        <Comment.Text>{comment.commentBody}</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            ))
                        }
                    </Segment> 
                )}    
            </Comment.Group>
        </div>
    );
};

export default SinglePost;
