const mongoose = require("mongoose");
const { errorLog } = require("../helpers/errorHandler");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    errorLog(error);
    process.exit(1);
  }
};

module.exports = connectDB;
