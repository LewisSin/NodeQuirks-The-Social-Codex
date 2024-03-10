const router = require('express').Router();
const {
    getUsers,
    getOneUser,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(newUser);

router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

//adds or removes friend based on the user id and friend id
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;