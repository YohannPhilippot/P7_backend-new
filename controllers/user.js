const models = require('../models')
const Users = models.users
const Op = models.Sequelize.Op
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



exports.signup = (req, res) => {
    if (!req.body.email) {
        res.status(400).json({ error })
    }
     
    bcrypt.hash(req.body.password, 10)
     
    .then( hash => {
        const user = models.users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            isModerator: req.body.isModerator
        })
    })
    .catch( err => {
        res.status(400).json({ err })
    })
    
}

exports.login = (req, res, next) => {
    models.users.findOne({ 
            where: { email: req.body.email }
         }) 

        .then((user) => {
            if (!user) {
                return res.status(401).json({error: 'Utilisateur non trouvé !'})
            }
            bcrypt.compare(req.body.password, user.password) 
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({error: 'Mot de passe incorrect !'})
                    }                    
                    res.status(200).json({
 
                        
                            userId: user.id,
                            token: jwt.sign(
                                {userId: user.id},
                                'nvlqNak25hq54xbg9HfgKywXJzuvppBTi7VrIGCW',
                                {expiresIn:'24h'}
                                
                            )
                            
                                          
                    })   
                                  
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.getOneUser = (req, res) => {
    
    models.users.findOne({
        where: {
            id: req.params.id
        }
    })
    .then( user => {
        res.status(200).json(user)
    })
    .catch( err => {
        res.status(404).json({ error })
    })
}

exports.getAllUsers = (req, res) => {
    User.findAll()
        .then( users => {
            res.status(200).json(users)
        })
        .catch( err => {
            res.status(404).json({ error })
        })
}

exports.deleteUser = (req, res) => {

    models.users.destroy({
        where: {
            id: req.params.id
        }
    })
        .then( user => {
            res.status(200).json(user)
        })
        .catch( err => {
            res.status(500).json({ error })
        })
}

exports.modifyUser = (req, res) => {

    models.users.findOne({
        where: {
            id: req.params.id
        }
    })
    .then( user => {
        const updateValues = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }
    user.update(updateValues)
        .then( () => {
            res.status(201).json({ message: 'Profil modifié avec succès !' })
        })
        .catch( err => {
            res.status(400).json({ error })
        })
    })
    .catch( err => {
        res.status(404).json({ message: 'Profil a modifier non trouvé !' })
    })
}
