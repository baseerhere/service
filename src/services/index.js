const users = require('./users/users.service.js');
const dishes = require('./dishes/dishes.service.js');
const sessions = require('./sessions/sessions.service.js');
const orders = require('./orders/orders.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(dishes);
  app.configure(sessions);
  app.configure(orders);
};
