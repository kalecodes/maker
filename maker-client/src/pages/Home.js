import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Rerousel } from 'rerousel';
import Auth from '../utils/auth';
import avatar from '../images/avatar.png'
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';
import { Image, Segment, Button } from 'semantic-ui-react';

const Home = () => {
    const { loading, data: postData} = useQuery(QUERY_POSTS);
    const posts = postData?.posts || [];
    const { data: userData } = useQuery(QUERY_ME);
    const user = userData?.me || {};

    const newPosts = [{}] 
    const popularPosts = [{}]
    const forSalePosts = [{}]
    const soldPosts = [{}]


    for (let i = 0; i < posts.length; i++) {
        if (posts[i].forSale === false) {
            newPosts.push(posts[i])
        }
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].commentCount >= 2) {
            popularPosts.push(posts[i])
        }
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].forSale === true) {
            forSalePosts.push(posts[i])
        }
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].sold === true) {
            soldPosts.push(posts[i])
        }
    }




    const loggedIn = Auth.loggedIn();

    const ref = useRef(null);

    return (
        <main className="container no-wrap">
            {loggedIn && userData ? (
                <div className="flex-row p-2">    
                    <div className="card p-2">
                        <div className="content">
                            {user.image ? (
                                <img className="right floated mini ui image" src={user.image} alt="my profile"/>
                            ) : (
                                <img className="right floated mini ui image" src={avatar} alt="default profile"/>
                            )}
                            <div className="header">
                                {user.username}
                            </div>
                            <div className="meta">
                                {`User since ` + user.createdAt}
                            </div>
                            <div className="description">
                                Posts: {user.posts.length} Faves: {user.favorites.length} Saves: {user.saves.length}
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
                        {user.favorites.length === 0 ? (
                            null
                        ) : (
                            <>
                            <h1>My Fav Artists</h1>
                            <div className="ui cards">
                                {user.favorites && 
                                    user.favorites.map(fav => (
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
            <div className="flex-row justify-space-between">
                <div className="mb-5">
                    <h2>New</h2>
                    {loading ? (
                        <Segment loading/>
                    ) : (
                        <Rerousel itemRef={ref} stop="true">
                            {newPosts.map(post => (
                                post.image ?
                                    <Link key={post._id} to={`/post/${post._id}`} ref={ref}>                              
                                            <Image size="medium" className="mx-2" src={post.image} alt={post.title}/>
                                    </Link>
                                : null
                            ))}
                        </Rerousel>    
                    )}
                </div>
                <div className="mb-5">
                    <h2>Most Popular</h2>
                    {loading ? (
                        <Segment loading/>
                    ) : (
                        <Rerousel itemRef={ref} stop="true">
                            {popularPosts.map(post => (
                                post.image ?
                                    <Link key={post._id} to={`/post/${post._id}`} ref={ref}>                              
                                            <Image size="medium" className="mx-2" src={post.image} alt={post.title}/>
                                    </Link>
                                : null
                            ))}
                        </Rerousel>  
                    )}
                </div>
                <div className="mb-5">
                    <h2>For Sale</h2>
                    {loading ? (
                        <Segment loading/>
                    ) : (
                        <Rerousel itemRef={ref} stop="true">
                            {forSalePosts.map(post => (
                                post.image ?
                                    <Link key={post._id} to={`/post/${post._id}`} ref={ref}>                              
                                            <Image size="medium" className="mx-2" src={post.image} alt={post.title}/>
                                    </Link>
                                : null
                            ))}
                        </Rerousel> 
                    )}
                </div>
                <div className="mb-5">
                    <h2>Recently Sold</h2>
                    {loading ? (
                        <Segment loading/>
                    ) : (
                        <Rerousel itemRef={ref} stop="true">
                            {soldPosts.map(post => (
                                post.image ?
                                    <Link key={post._id} to={`/post/${post._id}`} ref={ref}>                              
                                            <Image size="medium" className="mx-2" src={post.image} alt={post.title}/>
                                    </Link>
                                : null
                            ))}
                        </Rerousel>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;