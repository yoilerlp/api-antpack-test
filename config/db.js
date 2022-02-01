const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    host: './db.sqlite'
})

module.exports = sequelize