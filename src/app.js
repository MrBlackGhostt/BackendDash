import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { json } from "express";

const app = express();

app.use(json());

app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: true }));
app.use(express.static("public"));
app.use(express.static("./public"));
app.use(cookieParser());

//routes import

// import tourRouter from "/Users/mrblackghost/Desktop/Dashboard Backend/src/routes/tour.route.js";
import tourRouter from "./routes/tour.route.js";

// route decelaration

app.use("/api/v1/tour", tourRouter); // we add the middleware here as the user hit the link we pass the control to the tourRouter

export default app;
