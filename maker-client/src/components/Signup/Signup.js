import React, { useState, useEffect } from 'react';
import { getSignedRequest } from '../../utils/aws';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import { Button, Modal, Form, Segment } from 'semantic-ui-react';

import Auth from '../../utils/auth';

const options = [
    { key: 'y', text: 'Yes', value: 1 },
    { key: 'n', text: 'No', value: 0 }
]

const defaultUserData = {
    username: '',
    email: '',
    password: '',
    bio: '',
    isArtist: false
}

function modalReducer(state, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { open: true, dimmer: action.dimmer }
        case 'CLOSE_MODAL':
            return { open: false }
        default: 
            throw new Error()
    }   
}

const Signup = () => {
    const [file, setFile] = useState('');
    const [userData, setUserData] = useState(defaultUserData)
    const [userFileURL, setUserFileURL] = useState('');
    const [modalState, setModalState] = React.useReducer(modalReducer, {
        open: false, 
        dimmer: undefined
    })

    

    useEffect(() => {
        if (file) {
            getSignedRequest(file[0]).then((res) => {
                const urlObj = new URL(res.url);
                const imageUrl = `${urlObj.origin}${urlObj.pathname}`;
                setUserFileURL(imageUrl);
            });
        }
    }, [file]);
    
    const [addUser, { error }] = useMutation(ADD_USER);

    // submit form 
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        console.log(userData)
        console.log(userFileURL)
        
        try {
            const { data } = await addUser({
                variables: { username: userData.username, email: userData.email, password: userData.password, image: userFileURL, bio: userData.bio, isArtist: userData.isArtist }
            });

            Auth.login(data.addUser.token);

            setUserData(defaultUserData);
            setUserFileURL('');
            setModalState({ type: 'CLOSE_MODAL' })
        } catch (e) {
            console.error(e);
        }
    };

    // update state based on form input changes
    const handleChange = (e) => {
        setUserData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    };

    return (
        <div>
            <Button content="Sign Up" onClick={() => setModalState({ type: 'OPEN_MODAL', dimmer: 'blurring' })}/>
            <Modal 
                size="fullscreen"
                dimmer={modalState.dimmer}
                open={modalState.open}
                onClose={() => setModalState({ type: 'CLOSE_MODAL' })}
            >
                <Segment padded="very">
                    <Modal.Header as="h1" content="Sign Up"/>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Input
                            placeholder="artlover1"
                            name="username"
                            type="username"
                            id="username"
                            label="Username"
                            value={userData?.username}
                            onChange={handleChange}
                        />
                        <Form.Input 
                            placeholder="artlover1@email.com"
                            name="email"
                            type="email"
                            id="email"
                            label="Email"
                            value={userData?.email}
                            onChange={handleChange}      
                        />
                        <Form.Input
                            placeholder="********"
                            name="password"
                            type="password"
                            id="password"
                            label="Password"
                            value={userData?.password}
                            onChange={handleChange}
                        />
                        <Form.Input
                            id="image-upload"
                            name="image"
                            type="file"
                            label="Profle Pic"
                            content="Choose a Profile Pic"
                            onChange={(e) => {
                                setFile(e.target.files)
                            }}
                        />
                        <Form.TextArea
                            name="bio"
                            label="Bio"
                            value={userData?.bio}
                            placeholder="Tell us a little about yourself..."
                            onChange={handleChange}
                        />
                        <Form.Select 
                            name='isArtist'
                            label="Are you an Artist?"
                            value={userData?.isArtist}
                            options={options}
                            placeholder='Artists can post and sell their work'
                            onChange={handleChange}
                        />
                        <Button type='submit' content="Submit"/>
                    </Form>
                </Segment>
            </Modal>
        </div>
    )
};

export default Signup;