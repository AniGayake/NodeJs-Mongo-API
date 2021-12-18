const express = require('express');
const router = express.Router();
const User = require('../models/User');


// GET ALL THE USERS FROM DB
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.json({ message: err })
    }
});

// GET SPECIFIC USER FROM DB

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
});

// ADD NEW USER TO THE DB
router.post('/', async (req, res) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });
    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch(err) {
        res.json({message : err})
    }

});

//DELETE USER FROM DB
router.delete('/:id', async (req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.id });
        res.json(removedUser)
    } catch (err) {
        res.json({message :err})
    }

});

// UPDATE A USER
router.patch('/:id', async (req, res) => {
    try {
        const updatedUser = await User.updateOne({ _id: req.params.id }, { $set: { lastName: req.body.lastName } });
        res.json(updatedUser)
    } catch (err) {
        res.json({ message: err })
    }

});


module.exports = router;