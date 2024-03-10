const Thought = require('../models/thought');
User = require('../models/user');

module.exports = {
    //gets all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find().populate('reactions');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //gets thought by id
    async getOneThought(req, res) {
        try {
            const oneThought = await Thought.findOne({_id: req.params.thoughtId}).populate('reactions');
            res.json(oneThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //creates thought and pushes it to thoughts array in user schema
    async newThought(req, res) {
        try{
            const thoughtData = await Thought.create(req.body);
            const addThoughtToUser = await User.findOneAndUpdate({_id:req.body.userId}, { $push: {thoughts: thoughtData._id}}, {new: true});
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
    //updates thought 
    async updateThought(req, res) {
        try {
            const updateThoughtData = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body}, {runValidators: true, new: true});
            res.json(updateThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //deletes thought 
    async deleteThought(req, res) {
        try {
            const thoughtEraser = await Thought.findOneAndDelete({_id: req.params.thoughtId})
            res.json({ message: "Thought deleted"});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //creates reaction and pushes it to reaction array in thought schema 
    async createReaction(req, res) {
        try {
            const reactionBuilder = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, { $push: { reactions: req.body}}, {runValidators: true, new: true});
            res.json(reactionBuilder);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //deletes reaction 
    async deleteReaction(req, res) {
        try {
            const reactionEraser = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, { $pull: { reactions: { reactionId: req.params.reactionId}}}, { new: true });
            res.json({ message: "reaction deleted"});
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },
}