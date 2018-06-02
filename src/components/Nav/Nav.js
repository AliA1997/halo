import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout } from '../../ducks/reducer';
//Import react-icons 
import MdPowerSettingsNew from 'react-icons/lib/md/power-settings-new';
import FaFileTextO from 'react-icons/lib/fa/file-text-o';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import FaHome from 'react-icons/lib/fa/home';
import './Nav.css';
import axios from 'axios';

class Nav extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        axios.get('/api/user-data')
        .then(res => {
            dispatch(login(res.data.user));
            console.log(this.props.user);
        }).catch(err => console.log('Axios Get user-data errror', err));
    }
    logout() {
        const { dispatch } = this.props;
        axios.post('/api/logout')
        .then((res) => {
            dispatch(logout());
            return <div>{res.data.message}</div>
        }).catch(err => console.log('Axios post errror!!'));
    }
    render() {
        const { user } = this.props;
            return (
                <div className='navigation-bar' >
                    <div className='user-info-div'>
                        <div className='user-image-div'>
                            <img src={user && user.profile_picture} alt={user && user.username} />
                        </div>
                        <div className='username-div'>
                            <div className='username'>{user && user.username}</div>
                        </div>
                    </div>
                    <div className='home-button-div'>
                        <Link to='/dashboard'><FaHome className='icon' /></Link>
                    </div>
                    <div className='posts-button-div'>
                        <Link to='/new'><FaFileTextO className='icon'/><FaPlusCircle className='sub-icon' /></Link>
                    </div>
                    <div className='power-button-div' onClick={() => this.logout()}>
                        <Link to='/'><MdPowerSettingsNew className='icon' /></Link>
                    </div>
                </div>
            );
    }
};

const mapStateToProps = state => {
    return state;
}
export default connect(mapStateToProps)(Nav);