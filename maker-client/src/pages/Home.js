import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Rerousel } from 'rerousel';
import Auth from '../utils/auth';
import avatar from '../images/avatar.png'
import { useQuery } from '@apollo/client';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';
import { Image, Segment, Button } from 'semantic-ui-react';

const Home = () => {
    const { loading, data} = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];
    const { data: userData } = useQuery(QUERY_ME);
    
    let newPosts = [{}] 
    let forSalePosts = [{}]
    let soldPosts = [{}]


    for (let i = 0; i < posts.length; i++) {
        if (posts[i].forSale === false) {
            newPosts.push(posts[i])
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
                            {userData.me.image ? (
                                <img className="right floated mini ui image" src={userData.me.image} alt="my profile"/>
                            ) : (
                                <img className="right floated mini ui image" src={avatar} alt="default profile"/>
                            )}
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
            <div className="flex-row justify-space-between">
                <div className="mb-5">
                    <h2>New</h2>
                    {loading ? (
                        <Segment loading/>
                    ) : (
                        <Rerousel itemRef={ref} stop="true">
                            {newPosts && 
                                newPosts.map(post => (
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
                            {posts && 
                                posts.map(post => (
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
                            {forSalePosts && 
                                forSalePosts.map(post => (
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
                            {soldPosts && 
                                soldPosts.map(post => (
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