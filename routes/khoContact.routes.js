module.exports = app => {
    const khoContact = require("../controllers/khoContact.controller");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", khoContact.findAll);

    app.use('/api/khoContact', router);
  };