import mongoose from "mongoose";
import { DB_Name } from "../constant.js";
import express from "express";

const app = express();

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_Name}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // Check for the write concern configuration here
        writeConcern: {
          w: "majority",
          j: true,
          wtimeout: 1000,
        },
      }
    );

    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR", error);
    process.exit(1); // read in node doc
  }
};

export default connectDb;
