const User = require('../models/user');

module.exports = {
    //queries DB for all user data then displays in JSON format
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
    async getOneUser(req, res) {
        //cant get thoughts or reactions to populate.
        try {
            const user = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends');
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
    //creates user (remember to input username and email)
    async newUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //updates user
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: req.params.userId}, { $set: req.body }, { runValidators: true, new: true});
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //deletes user 
    async deleteUser(req, res) {
        try {
            const userEraser = await User.findOneAndDelete({ _id: req.params.userId });
            res.json({ message: "User deleted"});
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
    //adds friend to friends array in user schema
    async addFriend(req, res) {
        try {
            const newFriend = await User.findOneAndUpdate({ _id: req.params.userId}, { $addToSet: {friends: req.params.friendId }}, { new: true});
            res.json(newFriend);
        } catch (err) {
            res.status(500).json(err);
        }
        },
        //removes friends from array in user schema
    async removeFriend(req, res) {
        try {
            const removeFriends = await User.findOneAndUpdate({_id: req.params.userId}, { $pull: { friends: req.params.friendId }}, { new: true });
            res.json({ message: "friend removed"});
        } catch (err) {
            res.status(500).json(err);
        }
    }
};