import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Button } from 'semantic-ui-react'


const FaveList = ({ faves }) => {
    return (
        <main>
            {faves &&
                faves.map(fav => (
                    <Card key={fav._id}>
                        <Image src={fav.image} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{fav.username}</Card.Header>
                            <Card.Meta>
                                <span className="date">Joined {fav.createdAt}</span>
                            </Card.Meta>
                            <Card.Description>
                                {fav.bio}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Icon name="image" />
                            {fav.posts.length + ` `} Posts
                        </Card.Content>
                        <Link
                            to={`/profile/${fav.username}`}
                        >
                            <Button primary floated="right">
                                See User
                            </Button>
                        </Link>
                    </Card>
                ))}
        </main>
    )
}

export default FaveList;