const db = require("../models");
const Subscription = db.Subscription;
// const Op = db.Sequelize.Op;

// Add new Subscription
exports.create = (req, res) => {
  console.log("Request : ", req.userId)
  validateRequest(req);
// serviceID, serviceName, serviceLink, monthlyFee, startDate, userID
  const subscription = {
    serviceID: req.body.serviceID,
    serviceName: req.body.serviceName,
    serviceLink: req.body.serviceLink,
    monthlyFee:req.body.monthlyFee,
    startDate:req.body.startDate,
    user_id:req.userId
  };

  Subscription.create(subscription)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(422).send({
        message:
          err.message || "Error when adding a subscription!"
      });
    });
};

// Find all Subscription
exports.findAll = (req, res) => {
  Subscription.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(422).send({
        message:
          err.message || "Error when get all Subscription!"
      });
    });
};


// Update Subscription by Subscription id
exports.update = async(req, res) => {
  console.log("Request : ", req.body)
  validateRequest(req);

  const id = req.body.id;
  let subscription = await Subscription.findByPk(id)
  if(!subscription)
  {
    res.status(404).send({
      message: "No Subscription with Subscription id : " + id
    });
  }
  Subscription.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Subscription successfully updated."
        });
      } else {
        res.send({
          message: "Update process was failedQ"
        });
      }
    })
    .catch(err => {
      res.status(422).send({
        message: "Error updating Subscription with Subscription id : " + id
      });
    });
};

// Delete Subscription by Subscription id
exports.delete = async(req, res) => {
  console.log("Request : ", req.body)
  validateRequest(req);
  
  const id = req.params.id;
  let subscription = await Subscription.findByPk(id)
  if(!subscription)
  {
    res.status(404).send({
      message: "No Subscription with Subscription id : " + id
    });
  }
  Subscription.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Subscription successfully deleted."
        });
      } else {
        res.send({
          message: "Delete process was failed!"
        });
      }
    })
    .catch(err => {
      res.status(422).send({
        message: "Couldn't delete Subscription with Subscription id : " + id
      });
    });
};

function validateRequest(req){
  if (!req.body) {
    res.status(400).send({
      message: "Request is empty!"
    });
    return;
  }
}


