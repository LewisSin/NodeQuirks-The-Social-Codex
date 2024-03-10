const router = require('express').Router();
const {
    getThoughts,
    getOneThought,
    newThought,
    updateThought,
    deleteThought,
    createReaction, 
    deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(newThought);

//finds, updates, or deletes thoughts based on the thought id
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

//creates reaction and links it to the associated thought via id
router.route('/:thoughtId/reactions/').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;