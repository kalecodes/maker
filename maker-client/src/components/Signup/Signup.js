import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import { Button, Modal, Form } from 'semantic-ui-react';

import Auth from '../../utils/auth';

function signupReducer(state, action) {
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
    const [modalState, setModalState] = React.useReducer(signupReducer, {
        open: false, 
        dimmer: undefined
    })

    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [addUser, { error }] = useMutation(ADD_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    // submit form 
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setModalState({
            open: false, dimmer: undefined
        })

        try {
            const { data } = await addUser({
                variables: { ...formState }
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }

        setFormState({
            username: '',
            email: '',
            password: ''
        })
    };

    return (
        <div>
            <Button onClick={() => setModalState({ type: 'OPEN_MODAL', dimmer: 'blurring' })}>Sign Up</Button>
            <Modal 
                dimmer={modalState.dimmer}
                open={modalState.open}
                onClose={() => setModalState({ type: 'CLOSE_MODAL' })}
            >
                <Modal.Header>Sign Up</Modal.Header>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Input
                        placeholder="artlover1"
                        name="username"
                        type="username"
                        id="username"
                        value={formState.username}
                        onChange={handleChange}
                    />
                    <Form.Input 
                        placeholder="artlover1@email.com"
                        name="email"
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}      
                    />
                    <Form.Input
                        placeholder="********"
                        name="password"
                        type="password"
                        id="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <Button type='submit'>Submit</Button>
                </Form>
            </Modal>
        </div>
    )
};

export default Signup;