'use strict'

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'test';
const config = require(__dirname + '/../config/config')[env];
const dbTest = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => 
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    dbTest[model.name] = model;
  });

Object.keys(dbTest).forEach(modelName => {
  if (dbTest[modelName].associate) {
    dbTest[modelName].associate(dbTest);
  }
});

dbTest.sequelize = sequelize;
dbTest.Sequelize = Sequelize;

module.exports = dbTest;
