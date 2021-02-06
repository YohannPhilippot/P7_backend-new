'use strict';

const {
  Model
} = require('sequelize');





module.exports = (sequelize, Sequelize) => {
 
  var users = sequelize.define('users', {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        isModerator: {
            type: Sequelize.BOOLEAN
        }
    }, {});
    
    users.associate = function(models) {
      models.users.hasMany(models.posts)
    } 
    
  
    return users;
  };