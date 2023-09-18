const router = require('express').router;
const sequelize = require('../config/connection');


router.get('/', (req, res) => {
    post.findAll({
        attributes: ['id', 'title', 'body', 'userId'],
        include: [
            {
                model: Comment, 
                attributes: ['id', 'commentBody', 'userId'],
            },
            {
                model: User,
                attributes: ['username'],
            }
        ]
    })
})
.then(postData => {
    const posts = postData.map(post => post.get({plain: true}));
    res.render('home', {posts, loggedIn: req.session.loggedIn});
}) .catch(err => {
    res.status(500).json(err);
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'body', 'userId'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
})