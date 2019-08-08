const express = require('express')
const userDb = require('./userDb')
const router = express.Router();
// server.use(express.json())


function validateUserId(req, res, next) {
    const { id } = req.body
};




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

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

// function validateUserId(req, res, next) {

// };

// function validateUser(req, res, next) {

// };

// function validatePost(req, res, next) {

// };

module.exports = router;
