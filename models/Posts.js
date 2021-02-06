'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, Sequelize) => {
  class posts extends Model {
  
    static associate(models) {
      // define association here
      models.posts.belongsTo(models.users)
      }
    }
  
  
  posts.init({
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
        type: Sequelize.INTEGER
    }   
}, {
  sequelize,
  modelName: 'posts'
});

  
  return posts;
};