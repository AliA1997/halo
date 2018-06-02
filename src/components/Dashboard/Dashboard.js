import React, { Component } from 'react';
// import Post from '../Post/Post';
import { Link } from 'react-router-dom';
import { login } from '../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import './Dashboard.css';

class Dashboard extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        axios.get('/api/join-data')
        .then(res => {
            dispatch(login(res.data.user));
            console.log(this.props.user);
        }).catch(err => console.log('Axios Get user-data errror', err));
    }
    render() {
        const { user } = this.props;
        return (
            <div>
                <input type='text' placeholder='Search by Title' className='input-search' />
                <div>
                    {user && user[0] && user.map(p => <Link to={`/post/${p.post_id}`}>
                                                <div className='post-listing-div'>
                                                    <div className='title-post-div'>{p.title}</div>
                                                    <div className='user-info-listing-div'>
                                                        <div>
                                                            <div>{p.username}</div>
                                                            <div className='user-listing-img-div'>
                                                                <img className='user-listing-img' src={p.profile_picture} alt={p.username} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                    )}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)(Dashboard);