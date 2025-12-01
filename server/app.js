import express from 'express';
import morgan from "morgan";
import logger from "./logger.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(cookieParser());
app.set("view engine", "ejs");
const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
//routes

import healthRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
app.use("/api/v1/healthcheck",  healthRouter);
app.use("/api/v1/users", userRouter); // Note: Changed from /user to /users
app.use(errorHandler) ;
export { app };
