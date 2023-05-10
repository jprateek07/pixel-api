const { jwtAuth } = require("../middleware");
const subscriptionsServices = require("../services/subscriptions-services.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Authorization", "Origin, Content-Type, Accept");
    next();
  });
  // add a subscription 
  app.post("/api/auth/add-subscription", [jwtAuth.verifyToken], subscriptionsServices.create);

  // find all subscription
  app.get("/api/auth/subscriptions", [jwtAuth.verifyToken], subscriptionsServices.findAll);

  // update subscription by subscription id
  app.put("/api/auth/subscriptions", [jwtAuth.verifyToken], subscriptionsServices.update);

  // delete subscription by subscription id
  app.delete("/api/auth/subscription/:id", [jwtAuth.verifyToken], subscriptionsServices.delete);

};