const express = require('express')
const router = express.Router()
const postsCtrl = require('../controllers/posts')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.post('/posts/newPost', auth, multer, postsCtrl.createPost)
router.post('/posts/:postId/like', auth, postsCtrl.likePost)

router.put('/posts/:postId', auth, multer, postsCtrl.modifyPost)

router.get('/posts', auth, postsCtrl.getAllPosts)

router.delete('/posts/:postId', auth, postsCtrl.deletePost)


module.exports = router