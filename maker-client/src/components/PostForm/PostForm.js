import React, { Component, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';
import { Form } from 'semantic-ui-react'

const options =[
    { key: 'y', text: 'Yes', value: 1 },
    { key: 'n', text: 'No', value: 0 }
]

class PostForm extends Component {
    state = { image: '', title: '', description: '', forSale: 0, price: 0}

    handleChange = (e, { name, value}) => this.setState({  [name]: value })
    handleFileChange = (e) => this.setState({ image: e.target.files[0]}, () => {
        console.log(this.state)
    })
    handleSubmit = (e) => {
        e.preventDefault();
        const { image, title, description, forSale, price } = this.state
        this.setState({ image: image, title: title, description: description, forSale: forSale, price: price })

        console.log(this.state)
        // runquery to submit post

        this.setState({ image: '', title: '', description: '', forSale: 0, price: 0})
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group inline widths='equal'>
                        <Form.Input fluid name="title" label='Title' placeholder="Summerscape" onChange={this.handleChange}/>
                        <Form.Input
                            fluid
                            required
                            id='image-upload'
                            size='small'
                            name='image'
                            type='file'
                            content="Choose Image"
                            onChange={this.handleFileChange}
                        />
                    </Form.Group>
                    <Form.TextArea
                        name='description'
                        label='Description'
                        placeholder='Summer landscape painting of downtown Richmond, VA. Oil on canvas. Painted June 15, 2021...'
                        onChange={this.handleChange}
                    />
                    <Form.Group inline widths='equal'>
                        <Form.Select 
                            name='forSale'
                            fluid
                            label="For Sale"
                            options={options}
                            placeholder='Do you wish to post this as "for sale"?'
                            onChange={this.handleChange}
                        />
                        <Form.Input fluid name='price' label="Price" placeholder="Only fill this in if you have selected 'For Sale' as 'Yes'" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Button type="submit" content='Submit'/>
                </Form>
            </div>
        )
    }
}

// const PostForm = () => {
//     const [postImage, setImage] = useState('')
//     const [postTitle, setTitle] = useState('');
//     const [postDescription, setDescription] = useState('');
//     const [postForSale, setForSale] = useState(0);
//     const [postPrice, setPrice] = useState(0);

//     const [titleCharacterCount, setTitleCharacterCount] = useState(0)
//     const [characterCount, setCharacterCount] = useState(0);
//     const [priceForm, setPriceForm] = useState(0);

//     const [addPost, { error }] = useMutation(ADD_POST, {
//         update(cache, { data: { addPost } }) {
//             try {
//                 // update post arrays cache
//                 const { posts } = cache.readQuery({ query: QUERY_POSTS });
//                 cache.writeQuery({
//                     query: QUERY_POSTS,
//                     data: { posts: [addPost, ...posts] }
//                 });
//             } catch (e) {
//                 console.error(e);
//             }

//             // update me objects cache
//             const { me } = cache.readQuery({ query: QUERY_ME });
//             cache.writeQuery({
//                 query: { me: { ...me, posts: [...me.posts, addPost] } }
//             });
//         }
//     });

//     // update state based on form input changes
//     const handleDescription = (event) => {
//         if(event.target.value.length <= 280) {
//             setDescription(event.target.value);
//             setCharacterCount(event.target.value.length);
//         }
//     };

//     const handleForSale = (event) => {
//         if(event.target.value === 1) {
//             setPriceForm(event.target.value)
//             setForSale(event.target.value)
//         }
//     }

//     const handleTitle = (event) => {
//         if (event.target.value.length <= 80) {
//             setTitle(event.target.value)  
//             setTitleCharacterCount(event.target.value.length)  
//         }
        
//     }

//     const handlePrice = (event) => {
//         setPrice.trim(event.target.value)
//     }

//     const handleImage = (event) => {
//         setImage(event.target.value)
//     }


//     // submit form 
//     const handleFormSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             await addPost({
//                 variables: { postImage, postTitle, postDescription, postForSale, postPrice}
//             });

//             // clear form value 
//             setImage('')
//             setTitle('');
//             setDescription('');
//             setForSale(0);
//             setPrice(0.00);
//             setCharacterCount(0);  
//         } catch (e) {
//             console.error(e)
//         }
//     }

//     return (
//         <div className="ui form">
//             <form 
//                 className="flex-row justify-center justify-space-between-md align-stretch"
//                 onSubmit={handleFormSubmit}
//             >
//                 <div className="required field">
//                     <label>Image</label>
//                     <input 
//                         type="file"
//                         value={postImage}
//                         onChange={handleImage}
//                     />
//                 </div>
//                 <div className="field">
//                     <label>Title</label>
//                     <textarea 
//                         rows="1"
//                         placeholder="Summerscape"
//                         value={postTitle}
//                         onChange={handleTitle}
//                     ></textarea>
//                     <p 
//                         className={`m-0 ${titleCharacterCount === 80 || error ? 'text-error' : ''}`}
//                     >
//                         Character Count: {titleCharacterCount}/80
//                         {error && <span className="ml-2">Something went wrong...</span>}
//                     </p>
//                 </div>
//                 <div className="field">
//                     <label>Description</label>
//                     <textarea
//                         placeholder="Summer landscape painting of downtown Richmond, VA. Oil on canvas. Painted June 15, 2021"
//                         value={postDescription}
//                         onChange={handleDescription}
//                     ></textarea>
//                     <p
//                         className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
//                     >
//                         Character Count: {characterCount}/280
//                         {error && <span className="ml-2">Something went wrong...</span>}
//                     </p>
//                 </div>
//                 <div class="field">
//                     <label>For Sale</label>
//                     <div class="ui selection dropdown">
//                         <input value={postForSale} type="hidden" name="forSale" onChange={handleForSale}/>
//                         <i class="dropdown icon"></i>
//                         <div class="default text">Do you wish to post this as "for sale"</div>
//                         <div class="menu">
//                             <div class="item" data-value="1">Yes</div>
//                             <div class="item" data-value="0">No</div>
//                         </div>
//                     </div>
//                 </div>
//                 {priceForm === 1 && (
//                     <div class="inline required field">
//                         <label>Price</label>
//                         <input value={postPrice} onChange={handlePrice} type="text" placeholder="100.00"/>
//                     </div>
//                 )}                         
                
//             </form>
//         </div>
//     );
// };

export default PostForm;