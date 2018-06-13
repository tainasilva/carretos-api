const loginRoutes = require('./login_routes');
const userRoutes = require('./user_routes');
const advertisementRoutes = require('./advertisement_routes');

module.exports = (app, db) => {
  loginRoutes(app, db);
  userRoutes(app, db);
  advertisementRoutes(app, db);
};