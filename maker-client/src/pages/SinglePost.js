import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import Auth from '../utils/auth';
import { Image, Segment, Header, Comment, Form, Button, Divider } from 'semantic-ui-react';
import { ADD_COMMENT, ADD_SAVE } from '../utils/mutations';

const SinglePost = () => {
    const { id: postId } = useParams();
    const [addSave] = useMutation(ADD_SAVE);
    const [addComment] = useMutation(ADD_COMMENT);
    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    });
    const [commentBody, setBody] = useState('')

    const post = data?.post || {};
    const comments = data?.post.comments || {};

    if (loading) {
        return <Segment loading/>
    }

    const handleSave = async () => {
        try {
            await addSave({
                variables: { id: post._id}
            });
        } catch (e) {
            console.error(e);
        }
    };

    const handleBody = (event) => {
        setBody(event.target.value);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try { 
            await addComment({
                variables: { postId, commentBody }
            })

            setBody('');
            window.location.reload(false)
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div>
            <Segment padded="very" className="">
                <Image size="large" src={post.image} centered/>
                <Header size="huge">{post.title}</Header>
                <Header size="medium">Posted by: {` ` + post.username}</Header>
                <Link to={`/profile/${post.username}`}>
                    <Button content="View Artist Profile" labelPosition='left' icon='edit' secondary/>
                </Link>
                {Auth.loggedIn && (
                    <Button onClick={handleSave} key='savebutton' content="Save Post" labelPosition='left' icon='bookmark' primary floated='right'/>
                )}
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
                    onSubmit={handleFormSubmit}
                >
                    <Form.TextArea 
                        placeholder="You are so talented!"
                        required
                        id="comment"
                        name="comment"
                        rows="2"
                        value={commentBody.commentBody}
                        onChange={handleBody}
                    />
                    <Button content='Add Comment' type='submit' labelPosition='left' icon='edit' primary/>
                </Form>
                {comments.length === 0 ? (
                    <Segment key={comments.length} padded="very" className="mb-5">
                         <Comment>
                            <Comment.Avatar/>
                            <Comment.Content>
                                <Comment.Text>Be the first to comment!</Comment.Text>
                            </Comment.Content>    
                         </Comment>
                    </Segment>
                ) : (
                    <Segment key={comments.length} >
                        {comments &&
                            comments.map(comment => (
                                <>
                                <Comment key={comment._id}>
                                    <Comment.Avatar/>
                                    <Comment.Content>
                                        <Comment.Author>{comment.username}</Comment.Author>
                                        <Comment.Text>{comment.commentBody}</Comment.Text>
                                        <Comment.Metadata>{comment.createdAt}</Comment.Metadata>
                                    </Comment.Content>
                                </Comment>
                                <Divider/>
                                </>
                            ))
                        }
                    </Segment> 
                )}    
            </Comment.Group>
        </div>
    );
};

export default SinglePost;
