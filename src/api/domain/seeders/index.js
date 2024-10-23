// other imports...
const csvtojson = require('csvtojson'),
  fs = require('fs'),
  db = require('../../../../config/db'),
  { log } = require('../../lib/logger'),
  { TABLES } = require('../../../../config/constants')

let allTables = {
  [TABLES.HEART_RATE]: db.HeartRates,
}
try {
  for (const [table, model] of Object.entries(allTables)) {
    if (table !== undefined) {
      let filePath = 'data/' + table + '.csv'
      console.log(filePath)
      fs.readFile(filePath, async (err, data) => {
        if (err) console.error(err)
        if (!err && data) {
          await csvtojson()
            .fromFile(filePath)
            .then(async (source) => {
              await db.sequelize.transaction(async function (transaction) {
                await model
                  .bulkCreate(source, { transaction: transaction })
                  .then((data) => {
                    log.info(
                      `Records inserted into ${table} database successfully from ${table}.csv`
                    )
                  })
              })
            })
        }
      })
    }
  }
} catch (err) {
  console.log(err)
}

