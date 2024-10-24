const sequelize = require('sequelize'),
  moment = require('moment'),
  db = require('../../../config/db'),
  { logger } = require('../lib/logger'),
  getCurrentLine = require('get-current-line'),
  { getExecutionTimeDetails } = require('../utils/utility'),
  { calculateExecutionTime } = getExecutionTimeDetails(),
  HeartRates = db.HeartRates,
  seqConnection = db.sequelize;


/**
 * Create Heart Rate.
 *
 * @returns {Object}
 */
exports.createHeartRateService = async (req) => {
  const startTime = new Date().getTime()
  const currentMethodName = getCurrentLine.default().method;
  try {
    logger.info({
      action: `${currentMethodName.replace('exports.', '')} Start`,
      message: `Received ${currentMethodName.replace('exports.', '')} request.`,
      url: req.originalUrl,
      method: req.method,
      callingFunction: currentMethodName.replace('exports.', ''),
      callingFileName: getCurrentLine.default().file,
      currentLine: getCurrentLine.default().line,
      executionTime: startTime,
      userAgentInfo: req.headers['user-agent'],
      userId: req.User !== undefined ? req.User.id : '',
      userName: req.User !== undefined ? req.User.username : '',
    })
    let payload = req.body.clinical_data.heart_rate.data;
    payload = await payload.map((row) => {
      let obj = {
        on_date: moment(row.on_date).utc().format('YYYY-MM-DD HH:mm:ss'),
        measurement: parseInt(row.measurement)
      }
      return obj;
    })
    /** insert payload in bulk heart rates */
    return await HeartRates.bulkCreate(payload, {
      fields: [
        'on_date',
        'measurement'
      ]
    })
  } catch (err) {
    const endTime = new Date().getTime()
    logger.info({
      action: `${currentMethodName.replace('exports.', '')} End`,
      message: `Error calling ${req.method}: ${err.message}`,
      url: req.originalUrl,
      method: req.method,
      callingFunction: currentMethodName.replace('exports.', ''),
      callingFileName: getCurrentLine.default().file,
      currentLine: getCurrentLine.default().line,
      executionTime: endTime - startTime,
      userAgentInfo: req.headers['user-agent'],
      userId: req.User !== undefined ? req.User.id : '',
      userName: req.User !== undefined ? req.User.username : '',
    })
    return err
  }
}



/**
 * Get Heart Rate.
 *
 * @returns {Object}
 */
exports.getHeartRateService = async (req) => {
  const startTime = new Date().getTime()
  const currentMethodName = getCurrentLine.default().method;
  try {
    logger.info({
      action: `${currentMethodName.replace('exports.', '')} Start`,
      message: `Received ${currentMethodName.replace('exports.', '')} request.`,
      url: req.originalUrl,
      method: req.method,
      callingFunction: currentMethodName.replace('exports.', ''),
      callingFileName: getCurrentLine.default().file,
      currentLine: getCurrentLine.default().line,
      executionTime: startTime,
      userAgentInfo: req.headers['user-agent'],
      userId: req.User !== undefined ? req.User.id : '',
      userName: req.User !== undefined ? req.User.username : '',
    })
    const query = `SELECT 
              DATE_FORMAT(MIN(on_date), '%Y-%m-%dT%H:%i:%s.0Z') AS from_date,
              DATE_FORMAT(MAX(on_date), '%Y-%m-%dT%H:%i:%s.0Z') AS to_date,
              JSON_OBJECT(
                      'low',
                      MIN(measurement),
                      'high',
                      MAX(measurement)
                  )
              AS measurement
          FROM (
              SELECT 
                  measurement,
                  on_date,
                  DATE_FORMAT(on_date, '%Y-%m-%d %H:%i:00') - INTERVAL MINUTE(DATE_FORMAT(on_date, '%Y-%m-%d %H:%i:00')) % 15 MINUTE AS interval_start
              FROM heart_rate
          ) AS subquery
          GROUP BY interval_start
          ORDER BY interval_start;`
    return seqConnection.query(query, {
      raw: true,
      type: sequelize.QueryTypes.SELECT,
    })
  } catch (err) {
    const endTime = new Date().getTime()
    logger.info({
      action: `${currentMethodName.replace('exports.', '')} End`,
      message: `Error calling ${req.method}: ${err.message}`,
      url: req.originalUrl,
      method: req.method,
      callingFunction: currentMethodName.replace('exports.', ''),
      callingFileName: getCurrentLine.default().file,
      currentLine: getCurrentLine.default().line,
      executionTime: endTime - startTime,
      userAgentInfo: req.headers['user-agent'],
      userId: req.User !== undefined ? req.User.id : '',
      userName: req.User !== undefined ? req.User.username : '',
    })
    return err
  }
}

