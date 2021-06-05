module.exports = app => {
    const contactStatus = require("../controllers/contactStatus.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all contactStatus
    router.get("/", contactStatus.findAll);
    router.get("/count", contactStatus.findAllCount);
    router.get("/countConcatByStatus", contactStatus.countConcatByStatus);

    app.use('/api/contactStatus', router);
  };