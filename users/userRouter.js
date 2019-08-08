const express = require('express')
const userDb = require('./userDb')
const router = express.Router();
// server.use(express.json())


router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

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

router.put('/:id', (req, res) => {

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
