const Sequelize = require('sequelize'),
  { env } = require('../src/infrastructure/env'),
  { log } = require('../src/api/lib/logger'),
  /** mysql connection**/
  sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
    host: env.DB_HOST,
    dialect: env.DIALECT,
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  })
sequelize
  .authenticate()
  .then(() => {
    log.info('SQL Database Connection has been established successfully.')
  })
  .catch((error) => {
    log.error('Unable to connect to the database: ', error)
  })

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.HeartRates = require('../src/api/domain/schema/heartRateSchema')(
  sequelize,
  Sequelize
)

module.exports = db
