const mongoose = require("mongoose");

const server = require("./lib/server");

require("dotenv").config();

server.start();

const mongoURL = process.env.MONGOOSE_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
