const getCurrentLine = require('get-current-line'),
  {
    heartRateServices,
  } = require('../../../../services/heartRateServices'),
  {
    ErrorResponse,
    SuccessResponse,
  } = require('../../../../utils/apiResponse'),
  { logger } = require('../../../../lib/logger');


/**
 * get heart rates.
 *
 * @returns {Object}
 */
exports.getHeartRateController = (req, res) => {
  console.log('aa')
  const currentMethodName = getCurrentLine.default().method
  const startTime = new Date().getTime()
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
  SuccessResponse(res, 'Successfully listed.', [])
  heartRateServices(req)
    .then((response) => {
      const endTime = new Date().getTime()
      logger.info({
        action: `${currentMethodName.replace('exports.', '')} End`,
        message: `Successfully Response: ${JSON.stringify(response)}`,
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

      SuccessResponse(res, 'Successfully listed.', response)
    })
    .catch((err) => {
      const endTime = new Date().getTime()
      logger.error({
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
      ErrorResponse(res, err)
    })
}

