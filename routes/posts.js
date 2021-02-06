const express = require('express')
const router = express.Router()
const postsCtrl = require('../controllers/posts')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.post('/newPost', auth, multer, postsCtrl.createPost)

router.put('/:id', auth, multer, postsCtrl.modifyPost)

router.get('/allPosts', auth, postsCtrl.getAllPosts)
router.get('/:id', auth, postsCtrl.getOnePost)

router.delete('/:id', auth, postsCtrl.deletePost)


module.exports = router