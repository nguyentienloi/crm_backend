const db = require("../models");
const TokenFirebase = db.TokenFirebase;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const token = req.body.token;
  const check = await TokenFirebase.findOne({ where: {token: token}});
  if(!check) {
    const add = await TokenFirebase.create({
        token: token,
        status: 1,
    });
    if (add) {
    res.send({
        success: "true",
        mesage: 'Create token success.'
    });
    } else {
    res.send({
        success: "false",
        mesage: 'Create token fall.'
    });
    }
  } else {
    res.send({
        success: "false",
        mesage: 'token is exit.'
    });
  }
};

exports.findAll = async (req, res) => {
    const listToken = await TokenFirebase.findAll();
    res.send(listToken);
};