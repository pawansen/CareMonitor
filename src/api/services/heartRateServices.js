const db = require('../../../config/db'),
  { logger } = require('../lib/logger'),
  getCurrentLine = require('get-current-line'),
  { getExecutionTimeDetails } = require('../utils/utility'),
  { calculateExecutionTime } = getExecutionTimeDetails(),
  HeartRates = db.HeartRates;



/**
 * get modules.
 *
 * @returns {Object}
 */
exports.getModulesServices = async (req) => {
  const startTime = new Date().getTime()
  const currentMethodName = getCurrentLine.default().method
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
    return await HeartRates.findAll({
      attributes: [
        ['id', 'module_id'],
        'module_name',
        'can_view',
        'can_insert',
        'can_modify',
        'can_delete',
      ],
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
