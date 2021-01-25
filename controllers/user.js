const db = require('../models')
const User = db.users
const Op = db.Sequelize.Op

exports.signup = (req, res) => {
    if (!req.body.email) {
        res.status(400).json({ error })
    }

    bcrypt.hash(req.body.password, 10,)
        
    .then( hash => {
        const user = models.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            isModerator: false
        })

        User.create(user)
            .then( data => {
                res.status(201).json('Utilisateur créé avec succès')
            })
            .catch( err => {
                res.status(500).json({ error })
            })
    })
}

exports.login = (req, res) => {
    User.findOne({ 
            where: { email: email }
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
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'nvlqNak25hq54xbg9HfgKywXJzuvppBTi7VrIGCW',
                            { expiresIn: '24h' }

                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

exports.getOneUser = (req, res) => {
    const id = req.params.id

    User.findOne({
        where: {
            id: id
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
    const id = req.params.id

    User.destroy({
        where: {
            id: id
        }
    })
        .then( user => {
            res.status(200).json(user)
        })
        .catch( err => {
            res.status(500).json({ error })
        })
}