'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Post extends Model {
    
    static associate(models) {
      
      models.Post.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false        
        }
      })     
    }
  };

  const postSchema = sequelize.define("Post", {
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    medias: {
        type: Sequelize.STRING
    },
    likes: {
        type: Sequelize.INTEGER
    },
    dislikes: {
        type:Sequelize.INTEGER
    }
});
  return postSchema;
};