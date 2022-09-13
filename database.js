const mongoose = require("mongoose");
const DbUrl = process.env.DB;
async function DbConnection() {
  try {
    await mongoose.connect(DbUrl, {
      useNewUrlParser: true,
    });
    console.log("connection successful...");
  } catch (error) {
    console.log(error);
  }
}
DbConnection();
