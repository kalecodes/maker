import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Button, Divider } from 'semantic-ui-react';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FAV } from '../utils/mutations';

import Auth from '../utils/auth';
import PostForm from '../components/PostForm/PostForm';
import PostList from '../components/PostList/PostList'

const Profile = (props) => {
    const { username: userParam } = useParams();
    const [addFav] = useMutation(ADD_FAV);
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};
    const posts = user.posts;
    // redirect to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Redirect to="/profile" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this.
                Use the navigation links above to sign up or log in!
            </h4>
        );
    }

    const handleClick = async () => {
        try {
            await addFav({
                variables: { id: user._id }
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <div className="">
                <h2 className="">
                    Viewing {userParam ? `${user.username}'s` : `your`} profile.
                </h2>
                <div className="ui items">
                    <div className="ui item">
                        <div className="ui small image">
                            <img className="" src="https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295430__340.png" alt="me"/>
                        </div>
                        <div className="content">
                            <h1 className="m-1">{user.username}</h1>
                            <div className="meta">
                                <p>User since: {user.createdAt}</p>
                            </div>
                            <div className="description">
                                <p>Example bio hardcoded into this element</p>
                            </div>
                            <div className="extra">
                                Posts: {user.posts.length}
                            </div>
                        </div>
                    </div>
                </div>
                {userParam && (
                    <button className="" onClick={handleClick}>
                        Add To Favorites
                    </button>
                )}
            </div>
            {!userParam &&
                <div className="">
                        <PostForm />
                    </div>
            }
            <Divider hidden/>
            <div className="">
                <div>
                    <Button.Group widths='4'>
                        <Button>All</Button>
                        <Button>Posts</Button>
                        <Button>For Sale</Button>
                        <Button>Sold</Button>
                    </Button.Group>
                </div>
                <Divider hidden/>
                <PostList posts={posts}/>
            </div>
        </div>
    );
};

export default Profile;