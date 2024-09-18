const express = require("express");
const userController = require('../controllers/user');

const router = express.Router();

router.get('/',userController.getAllUsers)

router.get('/id',userController.getUserById)

router.post('/post',userController.createUser)

router.put('/:id',userController.updateuser)

router.delete('/:id',userController.deleteUser)


module.exports = router;