const ApiDocRoute = require('../../../../api/routes/v1/apiDocs'),
  HeartRateRoute = require('../../../../api/routes/v1/heartRateModule');
class Routes {
  constructor(app) {
    this.app = app
  }
  /* creating app Routes starts */
  appRoutes() {
    /** api doc root */
    new ApiDocRoute(this.app).routesConfig()
    /** Heart Rate Module root */
    new HeartRateRoute(this.app).routesConfig()
  }
  routesConfig() {
    this.appRoutes()
  }
}
module.exports = Routes
