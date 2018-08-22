const Sequelize = require('sequelize')
const config = require('./config.js')

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  }
)

const Formdata = sequelize.define('formdata', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  groups: Sequelize.JSON
}, {
  tableName: 'forms',
  timestamps: false
})

const models = {
  Formdata: Formdata
}

module.exports = models


