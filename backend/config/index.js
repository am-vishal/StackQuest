const mongoose = require("mongoose");

let _db;

module.exports = {
  connectToServer: async function () {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      _db = mongoose.connection;
      console.log("Successfully connected to MongoDB.");
      return _db;
    } catch (err) {
      throw err;
    }
  },

  getDb: function () {
    return _db;
  },
};
