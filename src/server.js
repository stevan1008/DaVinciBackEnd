const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const initRoutes = require("./routes/tutorial.routes");

global.__basedir = __dirname + "/..";

app.use(express.urlencoded({ extended: true }));
app.use(cors());
initRoutes(app);

db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});