const Validator = require('../../middlewares/validator'),
  {
    getHeartRateController,
  } = require('../../controllers/v1/app/heartRate/heartRatesController');

class HeartRateRoute {
  constructor(app) {
    this.app = app
  }
  /* creating app Routes starts */
  appHeartRateRoutes() {
    /** get heart rate */
    this.app.get(
      '/v1/get-heart-rate',
      getHeartRateController
    )
  }
  routesConfig() {
    this.appHeartRateRoutes()
  }
}
module.exports = HeartRateRoute
