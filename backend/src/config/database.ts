import mongoose from "mongoose";

import { DB_URI } from "./env";

if (!DB_URI) {
  throw new Error("Please define DB_URI environment variable.");
}

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URI);

    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database: ", error);

    process.exit(1);
  }
};

export default connectToDatabase;
