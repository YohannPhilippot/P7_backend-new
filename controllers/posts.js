const models = require('../models')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const Post = models.Post
const Op = models.sequelize.Op
const auth = require('../middleware/auth')

console.log(models.posts)
exports.createPost = (req, res) => {

    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'nvlqNak25hq54xbg9HfgKywXJzuvppBTi7VrIGCW')       
    const id = decodedToken.userId
    console.log(req.body)
    models.users.findOne({
        where: {id: id}
    })
    .then( user => {
        
        models.posts.create({
            title: req.body.title,
            content: req.body.content,
            medias: req.body.medias,
            likes: 0, 
            dislikes: 0,
            userId: id,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
    }
        
    )
    
         .then( post => {
            res.status(201).json(post)
        })
        .catch( err => {
            res.status(500).json({ error })
        })
    .catch( err => {
        res.status(500).json({ err })
    })
        
}

exports.newImage = (req, res) => {
    
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, '../../images')
        },
        filename: (req, file, callback) => {
            console.log(req.file)
            const name = file.originalname.split(' ').join('_').split('.')[0]
            const extension = file.mimetype
            callback(null, name + Date.now() + '.' + extension)
        }
    })
        multer({ storage: storage})
       
}

exports.modifyPost = (req, res) => {
    console.log(req.body)
    models.posts.findOne({
        where:{
            id: req.params.id
        }
    })
        .then( post => {
            const updateValues = {
            title: req.body.title,
            content: req.body.content,
            medias: req.body.medias
        }
        post.update(updateValues)
            .then( () => {
                res.status(201).json({ message: 'Post modifié avec succès !' })
            })
            .catch( err => {
                res.status(400).json({ error })
            })
        })
        .catch( err => {
            res.status(404).json({ message: 'Post a modifier non trouvé !' })
        })
}

exports.getAllPosts = (req, res) => {

    const order = req.query.order
    const limit = req.query.limit

    models.posts.findAll({
        order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
        limit: (!isNaN(limit) ? limit : 10),
        include:[{
            model: models.users,
            attributes: ['firstName', 'lastName']
        }]

    })
        .then( posts => {
            res.status(200).json(posts)
        })
        .catch( err => {
            res.status(404).json({ 'error': "Aucun post n'a été trouvé"})
        })
}

exports.getOnePost = (req, res) => {
    models.posts.findOne({
        where: { id : req.params.id}
    })
        .then( post => {
            res.status(200).json(post)
        })
        .catch( err => {
            res.status(404).json({ message: 'aucun post trouvé !'})
        })
}

exports.deletePost = (req, res) => {   
    models.posts.findOne({
        where: { id : req.params.id}
    })
        .then( post => {
            models.posts.destroy({
                where: {
                    id: req.params.id
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