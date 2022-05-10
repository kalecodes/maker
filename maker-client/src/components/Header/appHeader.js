import React, { createRef } from 'react';
import { Link } from 'react-router-dom';
import  Login  from '../Login/Login'
import Signup from '../Signup/Signup';
import { Button, Sticky, Header } from 'semantic-ui-react';

import Auth from '../../utils/auth'

const AppHeader = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
            <Sticky>
                <Header 
                    attached="top"
                    style={{ padding: '1.5em'}}
                    // className="bg-secondary mb-4 py-2 flex-row align-center"
                >
                    <div className="container flex-row justify-space-between-lg justify-center align-center">
                        <Link to="/" className="">
                            <h1 className="">Maker</h1>
                        </Link>
                        
                        <nav className="text-center">
                            {Auth.loggedIn() ? (
                                <div className="">
                                    <Link to="/profile">Me</Link>
                                    <Button onClick={logout}>Logout</Button>
                                </div>
                            ) : (
                                <Button.Group>
                                    <Login />
                                    <Button.Or />
                                    <Signup />
                                </Button.Group>
                            )}
                        </nav>
                    </div>
                </Header>
            </Sticky>
    );
};

export default AppHeader;