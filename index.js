const express = require("express");
const app = express();
require("dotenv").config();
require("./database");
const port = process.env.PORT || 4000;
app.use(require("./route"));

app.use(express.json());

app.listen(port, () => console.log(`Server listening on port ${port}!`));
