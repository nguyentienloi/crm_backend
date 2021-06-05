const db = require("../models");
const KhoContact = db.KhoContact;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    const result = {};
    KhoContact.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};