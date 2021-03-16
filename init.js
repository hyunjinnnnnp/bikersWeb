import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
