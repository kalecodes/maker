import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

import { Button, Modal, Form } from 'semantic-ui-react';

function loginReducer(state, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { open: true, dimmer: action.dimmer }
        case 'CLOSE_MODAL':
            return { open: false }
        default: 
            throw new Error()
    }   
}

const Login = (auth) => {
    const [modalState, setModalState] = React.useReducer(loginReducer, {
        open: false,
        dimmer: undefined
    })

    const [formState, setFormState] = useState({ email: '', password: ''});
    const [login, { error }] = useMutation(LOGIN_USER);

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
            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            email: '',
            password: ''
        });
    };

    return (
        <div>
            <Button onClick={() => setModalState({ type: 'OPEN_MODAL', dimmer: 'blurring' })}>Login</Button>
            <Modal 
                dimmer={modalState.dimmer}
                open={modalState.open}
                onClose={() => setModalState({ type: 'CLOSE_MODAL'})}
            >
                <Modal.Header>Login</Modal.Header>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Input 
                        placeholder="example@email.com"
                        name="email"
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <Form.Input 
                        placeholder="*******"
                        name="password"
                        type="password"
                        id="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <Button type="submit">Submit</Button>
                </Form>

                {error && <div>Login failed!</div>}
            </Modal>
        </div>            
    )
}

export default Login;