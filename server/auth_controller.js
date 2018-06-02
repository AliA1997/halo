const axios = require('axios');
module.exports = {
    login: (req, res) => {
        const payload = {
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `http://${req.headers.host}/auth/callback`
        }
        axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload).
        then(accessTokenRes => {
            axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessTokenRes.data.access_token}`)
            .then(userInfoRes => {
                const userData = userInfoRes.data;
                // console.log(userData);
                const dbInstance = req.app.get('db');
                console.log('Auth0id--------------', userData.sub);
                dbInstance.find_user(userData.sub)
                .then(users => {
                    if(users && users[0]){
                    req.session.user = users[0];
                    console.log('session login---------', req.session.user);
                    res.redirect('/');
                    } else {
                        const newUser = {
                            username: userData.nickname,
                            profile_picture: userData.picture,
                            auth0_id: userData.sub
                        };
                        dbInstance.register_user(newUser)
                        .then(users => {
                            req.session.user = users[0];
                            console.log('session registered---------', req.session.user);                          
                            res.redirect('/');
                        }).catch(err => console.log('register error-----------', err))
                    }
                }).catch(err => console.log('find-user error-----------', err))
            })
        })
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).json({message: 'Logout Successfully!!'});
    }
}