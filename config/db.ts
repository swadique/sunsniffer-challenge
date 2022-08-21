import mongoose from "mongoose";
import config from "config";

const mongodbUri: string =
  config.get("MONGODB_URI") || "mongodb://127.0.0.1:27017/covidDb";

const dbConnection = mongoose.createConnection(mongodbUri);

export default dbConnection;
