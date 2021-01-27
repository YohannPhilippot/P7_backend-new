const express = require('express')
const router = express.Router()
const postsCtrl = require('../controllers/posts')
const auth = require('../middleware/auth') 

router.post('/posts/newPost', auth, postsCtrl.createPost)
router.post('/posts/:postId/like', auth, postsCtrl.likePost)

router.get('/posts', auth, postsCtrl.getAllPosts)

router.delete('/posts/:postId', auth, postsCtrl.deletePost)


module.exports = router