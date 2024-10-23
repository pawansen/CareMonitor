const { UnauthorizedResponse } = require('../utils/apiResponse'),
  { ERROR_MESSAGES } = require('../../../config/constants'),
  { decode } = require('../lib/jwt'),
  { env } = require('../../infrastructure/env');
/**
 *
 * verify token
 * @param {token} req
 * @param {*} res
 * @param {*} next
 */

exports.verifyToken = function (req, res, next) {
  let accessToken = req.headers.authorization
  let ip_data =
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress ||
    req.client.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null)
  req.ip_data = ip_data
  req.body.Authorization = accessToken
  if (accessToken) {
    const token = accessToken.split(' ')[1]
    if (token) {
      /*verify token*/
      UnauthorizedResponse(res, error.message)
    } else {
      UnauthorizedResponse(res, ERROR_MESSAGES.AUTHORIZATION_REQUIRED)
    }
  } else {
    UnauthorizedResponse(res, ERROR_MESSAGES.AUTHORIZATION_REQUIRED)
  }
}
