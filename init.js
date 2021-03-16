import dotenv from "dotenv";
import app from "./app";
import "./db";
import "./models/Photo";
import "./models/Comment";

dotenv.config();

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
