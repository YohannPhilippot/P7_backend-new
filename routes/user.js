const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth') 


router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.delete('/:id', userCtrl.deleteUser)
router.get('/allUsers', userCtrl.getAllUsers)
router.get('/:id', userCtrl.getOneUser)


module.exports = router