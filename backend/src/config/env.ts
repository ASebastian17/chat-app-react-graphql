import dotenv from "dotenv";

dotenv.config();

export const { PORT, DB_URI } = process.env as {
  PORT: string;
  DB_URI: string;
};
