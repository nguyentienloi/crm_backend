const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
const db = require("./models");
const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
db.sequelize.sync();

require("./routes/contact.routes")(app);
require("./routes/contactStatus.routes")(app);
require("./routes/notification.routes")(app);
require("./routes/tokenFirebase.routes")(app);
require("./routes/khoContact.routes")(app);

// cronjob insert data contact
const { asyncContactKho1, asyncContactKho2} = require('./controllers/syncContact');
cron.schedule("0 */1 * * * *", asyncContactKho1);
cron.schedule("0 */1 * * * *", asyncContactKho2);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});