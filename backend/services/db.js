const mongoose = require("mongoose");

const connectDatabase = () => {
  const DB_URI = process.env.DB_URI;

  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("Successfully connected to DB");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDatabase;
