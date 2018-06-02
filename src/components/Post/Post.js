import React, { Component } from 'react';
import { getPost } from '../../ducks/reducer';
import axios from 'axios';
import { connect } from 'react-redux';

class Post extends Component {
    componentDidMount() {
        const { postId } = this.props.match.params;
        const { dispatch } = this.props;
        axios.get(`/api/posts/${postId}`)
        .then(res => {
            dispatch(getPost(res.data.post));
        }).catch(err => console.log('Axios Get Error--------------', err));
    }
    render() {
        const { currentProduct } = this.props;
        return (
            <div className='post-div'>
                <div>{currentProduct && currentProduct.title}</div>
                <div className='image-div'>
                    <img src={currentProduct && currentProduct.imageurl} alt={currentProduct && currentProduct.imageurl} className='image' />
                </div>
                <div className='description-div'>
                    <div className='description'>
                    {currentProduct && currentProduct.content}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        currentProduct: state.currentProduct
    };
}
export default connect(mapStateToProps)(Post);