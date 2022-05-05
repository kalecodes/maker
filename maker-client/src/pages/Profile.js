import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FAV } from '../utils/mutations';

import Auth from '../utils/auth';

const Profile = () => {
    const { username: userParam } = useParams();
    const [addFav] = useMutation(ADD_FAV);
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};

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

                {userParam && (
                    <button className="" onClick={handleClick}>
                        Add To Favorites
                    </button>
                )}
            </div>

            <div className="">
                <div className="">
                    
                </div>
                <div className="">

                </div>
            </div>
            <div className=""></div>
        </div>
    );
};

export default Profile;