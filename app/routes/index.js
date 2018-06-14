const loginRoutes = require('./login_routes');
const userRoutes = require('./user_routes');
const freightRoutes = require('./freight_routes');

module.exports = (app, db) => {
  loginRoutes(app, db);
  userRoutes(app, db);
  freightRoutes(app, db);
};