import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import avatar from '../../images/avatar.png'


const FaveList = ({ faves }) => {
    return (
        <main>
            <Card.Group itemsPerRow={3} stackable={true}>
                {faves &&
                    faves.map(fav => (
                        <Card key={fav._id}>
                            { fav.image ? (
                                <Image src={fav.image} wrapped ui={false} />
                            ) : (
                                <Image src={avatar} wrapped ui={false} />
                            )}
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
                                className="pb-2 pr-2"
                            >
                                <Button primary floated="right">
                                    See Profile
                                </Button>
                            </Link>
                        </Card>
                    ))}
                </Card.Group>
        </main>
    )
}

export default FaveList;