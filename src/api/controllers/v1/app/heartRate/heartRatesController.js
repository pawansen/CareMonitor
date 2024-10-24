const getCurrentLine = require('get-current-line'),
  {
    createHeartRateService,
    getHeartRateService
  } = require('../../../../services/heartRateServices'),
  {
    ErrorResponse,
    SuccessResponse,
    SuccessCreated
  } = require('../../../../utils/apiResponse'),
  { logger } = require('../../../../lib/logger');

/**
* Create heart rates.
*
* @returns {Object}
*/
exports.createHeartRateController = (req, res) => {
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
  createHeartRateService(req)
    .then((response) => {
      const endTime = new Date().getTime()
      logger.info({
        action: `${currentMethodName.replace('exports.', '')} End`,
        message: `Successfully Created: ${JSON.stringify(response)}`,
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
      SuccessCreated(res, 'Successfully Created.')
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


/**
 * get heart rates.
 *
 * @returns {Object}
 */
exports.getHeartRateController = (req, res) => {
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
  getHeartRateService(req)
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
      if (response.length == 0) {
        ErrorResponse(res, "Records not found!")
      } else {
        let result = {
          'HEART_RATE': {
            "uom": "beats/min",
            "data": response,
            "WEIGHT": {
              "uom": "Kg",
              "name": "Weight"
            },
            "BLOOD_GLUCOSE_LEVELS": {
              "uom": "mmol/L",
              "name": "Blood Glucose"
            },
            "HEIGHT": {
              "uom": "cm",
              "name": "Height"
            },
            "BP": {
              "uom": "mmHg",
              "name": "Blood Pressure"
            },
            "STEPS": {
              "uom": "",
              "data": [
                {
                  "on_date": "2020-10-05T13:00:00.000000Z",
                  "measurement": "11031"
                },
                {
                  "on_date": "2020-10-06T13:00:00.000000Z",
                  "measurement": "4667"
                },
                {
                  "on_date": "2020-10-07T13:00:00.000000Z",
                  "measurement": "13030"
                },
                {
                  "on_date": "2020-10-08T13:00:00.000000Z",
                  "measurement": "3048"
                }
              ],
              "name": "Steps"
            }
          }
        }
        SuccessResponse(res, 'Successfully listed.', result)
      }

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

