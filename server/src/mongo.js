const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDb() {
  try {
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    await mongoose.connect(MONGODB_URI, options);
    console.log("Connected to database");
  } catch (err) {
    console.log("Failed to connect to database", err);
  }
}

module.exports = {
  connectToDb,
  mongoose
};
