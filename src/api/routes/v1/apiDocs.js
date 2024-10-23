const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../../../api-docs/swagger.json')
/** create user router function */
class ApiDocRoute {
  constructor(app) {
    this.app = app
  }
  /* creating app Routes starts */
  appApiDocRoute() {
    /** signup */
    this.app.use('/api-docs', swaggerUi.serve)
    this.app.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  }
  routesConfig() {
    this.appApiDocRoute()
  }
}
module.exports = ApiDocRoute
