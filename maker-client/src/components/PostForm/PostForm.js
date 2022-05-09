import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { Form, Button, Modal, Segment } from 'semantic-ui-react'
import { getSignedRequest } from '../../utils/aws';

const options =[
    { key: 'y', text: 'Yes', value: 1 },
    { key: 'n', text: 'No', value: 0 }
]

const defaultPostData = {
    title: '',
    description: '',
    forSale: false,
    price: 0
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

const PostForm = () => {
    const [file, setFile] = useState('');
    const [postData, setPostData] = useState(defaultPostData)
    const [postFileURL, setPostFileURL] = useState('');
    const [modalState, setModalState] = React.useReducer(modalReducer, {
        open: false,
        dimmer: undefined
    })

    useEffect(() => {
        if (file) {
            getSignedRequest(file[0]).then((res) => {
                const urlObj = new URL(res.url);
                const imageUrl = `${urlObj.origin}${urlObj.pathname}`;
                setPostFileURL(imageUrl);
            });
        }
    }, [file]);

    const [addPost, { error }] = useMutation(ADD_POST);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await addPost({
                variables: { image: postFileURL, title: postData.title, description: postData.description, forSale: postData.forSale, price: postData.price }
            });
            setPostData(defaultPostData);
            setPostFileURL('');
            setModalState({ type: 'CLOSE_MODAL' })
            window.location.reload(false)
        } catch (e) {
            console.error(e)
        }
    };

    const handleChange = (e) => {
        setPostData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    return (
        <div className='mt-5'>
            <Button className="" content="New Post" onClick={() => setModalState({ type: 'OPEN_MODAL', dimmer: 'blurring' })}/>
            <Modal
                size="fullscreen"
                dimmer={modalState.dimmer}
                open={modalState.open}
                onClose = {() => setModalState({ type: 'CLOSE_MODAL' })}
            >
            <Segment padded="very">
            <Modal.Header>Add a New Post</Modal.Header>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group inline widths='equal'>
                    <Form.Input fluid name="title" label='Title' placeholder="Summerscape" value={postData?.title} onChange={handleChange}/>
                    {/* <p 
                        className={`pt-4 m-0 mr-2 ${titleCharacterCount === 80 || error ? 'text-error' : ''}`}
                    >
                        {titleCharacterCount}/80
                        {error && <span className="ml-2">Something went wrong...</span>}
                    </p> */}
                    <Form.Input
                        fluid
                        required
                        id='image-upload'
                        size='small'
                        name='image'
                        type='file'
                        content="Choose Image"
                        onChange={(e) => {
                            setFile(e.target.files)
                        }}
                    />
                </Form.Group>
                <Form.TextArea
                    name='description'
                    label='Description'
                    value={postData?.description}
                    placeholder='Summer landscape painting of downtown Richmond, VA. Oil on canvas. Painted June 15, 2021...'
                    onChange={handleChange}
                />
                {/* <p
                    className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
                >
                    Character Count: {characterCount}/280
                    {error && <span className="ml-2">Something went wrong...</span>}
                </p> */}
                <Form.Group inline widths='equal'>
                    <Form.Select 
                        name='forSale'
                        fluid
                        label="For Sale"
                        value={postData?.forSale}
                        options={options}
                        placeholder='Do you wish to post this as "for sale"?'
                        onChange={handleChange}
                    />
                    <Form.Input fluid name='price' value={postData?.price} label="Price" placeholder="Only fill this in if you have selected 'For Sale' as 'Yes'" onChange={handleChange}/>
                </Form.Group>
                <Form.Button type="submit" content='Submit'/>
            </Form> 
            </Segment>
        </Modal>
        </div>
    )
}

export default PostForm;