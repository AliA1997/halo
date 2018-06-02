import React, { Component } from 'react';
import axios from 'axios';

export default class Form extends Component {
    constructor() {
        super();
        this.state = {
            imageurl: '',
            title: '',
            content: ''
        }
    }
    handleChange(type, val){
        if(type === 'imageurl') this.setState({imageurl: val});
        else if(type === 'content') this.setState({content: val});
        else this.setState({title: val});
    }
    createPost() {
        const { imageurl, title, content } = this.state;
        axios.post('/api/posts', { imageurl, title, content })
        .then(res => {
            console.log(res.data.createdPost);
        }).catch(err => console.log('Frontend axios error--------', err));
    }
    render() {
        return (
            <div>
                <form>
                    <img src={this.state.imageurl} alt={this.state.title} />
                    <div>Imageurl</div>
                    <input type='text' className='form-input' onChange={e => this.handleChange('imageurl', e.target.value)} />                    <div>Title</div>                    
                    <input type='text' className='form-input' onChange={e => this.handleChange('title', e.target.value)} />   
                    <div>Content</div>                    
                    <textarea type='text' className='form-textarea' onChange={e => this.handleChange('content', e.target.value)}>
                    </textarea>                 
                    <button onClick={() => this.createPost()}>Create Post</button>
                </form>
            </div>
        );
    }
}