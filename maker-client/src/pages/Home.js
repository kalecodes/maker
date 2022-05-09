import React from 'react';
import { Link } from 'react-router-dom';
import { Rerousel } from 'rerousel';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';
import { Image, Segment, Button } from 'semantic-ui-react';

const Home = () => {
    const { loading, data} = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];
    const { data: userData } = useQuery(QUERY_ME);
    
    const loggedIn = Auth.loggedIn();

    return (
        <main className="flex-row no-wrap">
            {loggedIn && userData ? (
                <div className="col-md-4 p-2">    
                    <div className="card p-2">
                        <div className="content">
                            <img className="right floated mini ui image" src="https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295430__340.png" alt="my profile"/>
                            <div className="header">
                                {userData.me.username}
                            </div>
                            <div className="meta">
                                {`User since ` + userData.me.createdAt}
                            </div>
                            <div className="description">
                                Posts: {userData.me.posts.length} Faves: {userData.me.favorites.length} Saves: {userData.me.saves.length}
                            </div>
                        </div>
                        <div className="extra content">
                            <Button.Group>
                                <Link to={`/faves`}>
                                    <Button
                                        content="My Faves"
                                        icon="star"
                                        labelPosition="left"
                                    />
                                </Link>
                                <Link to={`/saves`}>
                                    <Button
                                        content="My Saves"
                                        icon="folder"
                                        labelPosition="left"
                                    />
                                </Link>
                            </Button.Group>
                        </div>
                    </div>
                    {/* <div className="">
                        {userData.me.favorites.length === 0 ? (
                            null
                        ) : (
                            <>
                            <h1>My Fav Artists</h1>
                            <div className="ui cards">
                                {userData.me.favorites && 
                                    userData.me.favorites.map(fav => (
                                        <div key={fav._id} className="card">
                                            <div class="content">
                                                <img class="right floated mini ui image" src={fav.image} alt={fav.username}/>
                                                <div class="header">
                                                    {fav.username}
                                                </div>
                                                <div class="meta">
                                                    Artist since {fav.createdAt}
                                                </div>
                                                <div class="description">
                                                    Posts: {fav.posts.length}
                                                </div>
                                                </div>
                                                <div class="extra content">
                                                <Link to={`/profile/${fav.username}`}>
                                                    <div class="ui">
                                                        <div class="">View Profile</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            </>
                        )}
                    </div> */}
                </div>
            ) : null}
            <div className="col col-md-8 justify-space-between">
                <div className="mb-5">
                    <h2>New</h2>
                    {loading ? (
                        <Segment loading/>
                    ) : (
                        <Rerousel responsive='true'>
                            {posts && 
                                posts.map(post => (
                                    <Link key={post._id} to={`/post/${post._id}`}>                              
                                            <Image size="small" className="mx-1" src={post.image} alt={post.title}/>
                                    </Link>
                                ))}
                        </Rerousel>    
                    )}
                </div>
                <div className="mb-5">
                    <h2>Most Popular</h2>
                    {loading ? (
                        <Segment loading/>
                    ) : (
                        <Rerousel responsive='true'>
                            {posts && 
                                posts.map(post => (
                                    <Link key={post._id} to={`/post/${post._id}`}>                              
                                            <Image size="small" className="mx-1" src={post.image} alt={post.title}/>
                                    </Link>
                                ))}
                        </Rerousel>  
                    )}
                </div>
                <div className="mb-5">
                    <h2>For Sale</h2>
                    {loading ? (
                        <Segment loading/>
                    ) : (
                        <Rerousel responsive='true'>
                            {posts && 
                                posts.map(post => (
                                    <Link key={post._id} to={`/post/${post._id}`}>                              
                                            <Image size="small" className="mx-1" src={post.image} alt={post.title}/>
                                    </Link>
                                ))}
                        </Rerousel> 
                    )}
                </div>
                <div className="mb-5">
                    <h2>Recently Sold</h2>
                    {loading ? (
                        <Segment loading/>
                    ) : (
                        <Rerousel responsive='true'>
                            {posts && 
                                posts.map(post => (
                                    <Link key={post._id} to={`/post/${post._id}`}>                              
                                            <Image size="small" className="mx-1" src={post.image} alt={post.title}/>
                                    </Link>
                                ))}
                        </Rerousel>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;