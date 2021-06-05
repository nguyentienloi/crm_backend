module.exports = app => {
    const tokenFirebase = require("../controllers/tokenFirebase.controller");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.post("/", tokenFirebase.create);
    router.get("/", tokenFirebase.findAll);
    app.use('/api/tokenFirebase', router);
  };