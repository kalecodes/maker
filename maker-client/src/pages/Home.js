import React from 'react';


import Auth from '../utils/auth';

const Home = () => {
    const loggedIn = Auth.loggedIn();

    return (
        <main>
            <div>
                This is the Home page
            </div>
        </main>
    );
};

export default Home;