module.exports = {
    joinUserData: (req, res) => {
        if(req.session.user) {
            const { auth0_id } = req.session.user;
            const dbInstance = req.app.get('db');
            console.log('auth0id================', auth0_id);      
            console.log('Sessionsss================', req.session.user);      
            dbInstance.display_user_data(auth0_id)
            .then(users => {
                if(users[0]) {
                    req.session.user = users;
                    console.log('-------new session', req.session.user);                    
                    res.status(200).json({user: users[0]});
                }
            }).catch(err => console.log('User Data error----------', err));
        }
    },
    getUserData: (req, res) => {
        res.status(200).json({user: req.session.user});
    },
    getPost: (req, res) => {
        const { id } = req.params;
        const dbInstance = req.app.get('db');
        dbInstance.get_post(id)
        .then(posts => {
            res.status(200).json({post: posts[0]});
        })
    },
    createPost: (req, res) => {
        if(req.session.user) {
            const { auth0_id } = req.session.user;
            console.log('Create Post auth0 id---------', auth0_id);
            const { imageurl, title, content } = req.body;
            const dbInstance = req.app.get('db');
            const newPost = { imageurl, title, content, auth0_id }
            dbInstance.create_post(newPost)
            .then(posts => {
                res.status(200).json({createdPost: posts[0]});
            }).catch(err => console.log('create post error-----------', err));
        }
    },
    deletePost: (req, res) => {
        if(req.session.user){
            const { id } = req.body;
            const dbInstance = req.app.get('db');
            dbInstance.delete_post(id)
            .then(posts => {
                res.status(200).json({message: 'Post just got deleted!'});
            }).catch(err => console.log('Delete Database Error-------', err));
        }
    },
    editPost: (req, res) => {
        const { id, imageurl, title, content } = req.body;
        const dbInstance = req.app.get('db');
        const newPost = { id, imageurl, title, content };
        dbInstance.edit_post(updatedPost)
        .then(posts => {
            res.status(200).json({posts: posts[0]})
        }).catch(err => console.log('Database put error-------------', err));
    }
}