'use'

const dbConfig = require(__dirname + "/../config/db.config.js");
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const Sequelize = require("sequelize");
const db = {};

let sequelize;

sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, dbConfig);




fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.indexOf('.js') );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;



module.exports = db;