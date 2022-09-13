const express = require("express");
const app = express();
require("dotenv").config();
require("./database");
const port = process.env.PORT;
app.use(require("./route"));

app.listen(port, () => console.log(`Server listening on port ${port}!`));
