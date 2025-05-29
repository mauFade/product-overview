import { config } from "dotenv";
import { resolve } from "path";
import { ExpressServer } from "../express";
import { connectDb } from "@infra/mongoose";

config({ path: resolve(__dirname, "../../../.env") });

const httpPort = Number(process.env.APP_PORT) || 33333;
const httpServer = new ExpressServer(httpPort);

(async () => {
  await connectDb();

  httpServer.start();
})();
