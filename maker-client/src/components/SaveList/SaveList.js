import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Button } from 'semantic-ui-react'


const SaveList = ({ saves }) => {
    return (
        <main>
            <Card.Group itemsPerRow={3} stackable={true}>
                {saves &&
                    saves.map(save => (
                        <Card key={save._id}>
                            <Image src={save.image} wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>{save.title}</Card.Header>
                                <Card.Meta>
                                    <span className="date">Joined {save.createdAt}</span>
                                </Card.Meta>
                                <Card.Description>
                                    {save.description}
                                </Card.Description>
                            </Card.Content>
                            {/* <Card.Content extra>
                                <Icon name="comment" />
                                {save.comments.length + ` `} Comments
                            </Card.Content> */}
                            <Link
                                to={`/post/${save._id}`}
                                className="pb-2 pr-2"
                            >
                                <Button primary floated="right">
                                    See Post
                                </Button>
                            </Link>
                        </Card>
                    ))}
            </Card.Group>
        </main>
    )
}

export default SaveList;