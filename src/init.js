import dotenv from "dotenv";
import app from "./app";
import "./db";
import "./models/Photo";
import "./models/Comment";
import "./models/User";

dotenv.config();

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅listening on: https://localhost:${PORT}`);

app.listen(PORT, handleListening);
