module.exports = app => {
    const contact = require("../controllers/contact.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    // router.post("/", contact.create);
  
    // Retrieve all Tutorials
    router.get("/", contact.findAll);
  
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", contact.findOne);
  
    // Update a Tutorial with id
    router.patch("/update/:id", contact.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/api/contact', router);
  };