module.exports = app => {
    const notification = require("../controllers/notification.controller");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", notification.findAll);
    router.patch("/:id", notification.findOne);
    router.get("/countNoti", notification.findAllCount);
    router.get("/readAll", notification.readAll);

    app.use('/api/notification', router);
  };