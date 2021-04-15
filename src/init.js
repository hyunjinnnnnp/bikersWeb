import fs from "fs";
import https from "https";
import dotenv from "dotenv";
import path from "path";
import app from "./app";
import "./db";
import "./models/Photo";
import "./models/Comment";
import "./models/User";

dotenv.config();

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅listening on: https://localhost:${PORT}`);

const httpsOptions = {
  key: fs.readFileSync(path.resolve("src", "mkcert", "key.pem")),
  cert: fs.readFileSync(path.resolve("src", "mkcert", "cert.pem")),
};

https.createServer(httpsOptions, app).listen(PORT, handleListening);
