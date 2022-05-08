import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label } from 'semantic-ui-react';

const PostList = ({ posts }) => {
    if (posts.length === 0) {
        return <h3>No Posts Yet</h3>
    }

    return (
        <div>
            <Item.Group divided>
            {posts &&
                posts.map(post => (
                    <Item key={post._id}>
                        <Item.Image src="https://my-maker-bucket.s3.amazonaws.com/Paint_your_Petjpg.jpeg" />
                        <Item.Content>
                            <Item.Header>{post.title}</Item.Header>
                            <Item.Description>{post.description}</Item.Description>
                        </Item.Content>
                        <Item.Extra>
                            <Label>Likes: #</Label>
                            <Label>Comments: #</Label>
                            <Link 
                                to={`/post/${post._id}`}
                            >
                                <Button primary floated="right">
                                    See Post
                                    <Icon name="right chevron" />
                                </Button>
                            </Link>
                        </Item.Extra>
                    </Item>
                )
            )}
            </Item.Group>
        </div>
    )
};

export default PostList