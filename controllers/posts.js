const db = require('../models')
const User = db.users
const Op = db.Sequelize.Op

exports.createPost = (req, res) => {
    const Post = JSON.parse(req.body.postBody)

    const id = req.params.id

    models.User.findOne({
        where: {
            id: id
        }
    })

        .then( user => {
            const postContent = models.Posts.create({
                title: Post.postTitle,
                content: Post.postContent,
                medias: Post.medias,
                likes: 0, 
                dislikes: 0,
                userId: id
            })
        })
            .then( post => {
                res.status(201).json(post)
            })
            .catch( err => {
                res.status(500).json({ error })
            })
        .catch( err => {
            res.status(500).json({ error })
        })
}


exports.getAllPosts = (req, res) => {
    models.Posts.findAll({
        order: [Posts, 'createdAt', 'DESC'], 
        include: [{
            model: models.User,
            attributes: ['firstName', 'lastName']
        }],
        limit: 10
    })
        .then( posts => {
            res.status(200).json(posts)
        })
        .catch( err => {
            res.status(404).json({ 'error': "Aucun post n'a été trouvé"})
        })
}

exports.deletePost = (req, res) => {
    const id = req.params.id
    
    models.Posts.findOne({
        where: {
            id: id
        }
    })
        .then( post => {
            models.Posts.destroy({
                where: {
                    id: post.id
                }
            })
                .then( post => {
                    res.status(200).json({ message: 'post supprimé avec succès' })
                })
                .catch( err => {
                    res.status(404).json({ message: 'échec de la suppression du post' })
                })
        })
        .catch( err => {
            res.status(500).json({ error })
        })

}