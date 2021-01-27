'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    class User extends Model {
        
        static associate(models) {

          models.User.hasMany(models.Message);

        }
      };


    const userSchema = sequelize.define("User", {
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
    });
  
    return userSchema;
  };