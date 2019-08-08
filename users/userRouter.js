const express = require('express')
const userDb = require('./userDb')
const postDb = require('../posts/postDb')
const router = express.Router();



router.post('/', validateUser, (req, res) => {
    userDb.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            res.status(500).json({ message: 'cannot create user' })
        })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    
    req.body.user_id = req.params.id
    
    postDb.insert(req.body)
        .then(posts => {
            res.status(201).json(posts)
        })
        .catch(error => {
            res.status(500).json({ message: 'cannot create post' })
        })
});

router.get('/', (req, res) => {
    userDb.get()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(res.status(500).json({ error: 'no user found'}))
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
    userDb.getUserPosts(req.params.id)
        .then( posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json({ message: 'no posts found' })
        })
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', validateUserId, validateUser, (req, res) => {

    const { id } = req.params.id;
    const changes = req.body;

    userDb.update(id, changes)
        then(updated => {
            res.status(200).json(updated)
        })
        .catch(error => {
            res.status(500).json({ message: 'cannot sent update' })
        })


});

//custom middleware


function validateUserId(req, res, next) {
    const { id } = req.params

    userDb.getById(id)
        .then(user => {

            if(!user){
                console.log(user)
                req.user = user;
                next();
            } else {
                return res.status(404).json({message: 'user ID not found'})
            }
        })
        .catch(error => {
            res.status(500).json({message: 'invalid user id'})
        });
};


function validateUser(req, res, next) {
    const body = req.body;
    const name = req.body.name;

    if(!body){
        res.status(400).json({ message: 'missing required user' })
    } else if(!name){
        res.status(400).json({ message: 'missing required name' })
    } else {
        next()
    }
};

function validatePost(req, res, next) {
    const body = req.body;
    const text = req.body.text;

    if(!body){
        res.status(400).json({ message: 'missing required post' })
    } else if(!text){
        res.status(400).json({ message: 'missing required text' })
    } else {
        next()
    }

};

module.exports = router;
