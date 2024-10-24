const Validator = require('../../middlewares/validator'),
  {
    createHeartRateController,
    getHeartRateController,
  } = require('../../controllers/v1/app/heartRate/heartRatesController');

class HeartRateRoute {
  constructor(app) {
    this.app = app
  }
  /* creating app Routes starts */
  appHeartRateRoutes() {

    /** 
     * 
     * Create heart rate
     * 
     *  */
    this.app.post(
      '/v1/create-heart-rate',
      Validator('createHeartRateValidate'),
      createHeartRateController
    )
    /** 
     * 
     * Get heart rate
     * 
     *  */
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
