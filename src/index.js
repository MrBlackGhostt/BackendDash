import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDb()
  .then(() => {
    // application listen after connected with database
    app.on("error", () => {
      console.log("ERROR: ", error);
      throw error;
    });
    app.listen(process.env.PORT || 7000, () => {
      console.log(`Server is running at Port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db not Connected", err);
  });

app.use("/", (req, res) => {
  res.send("/");
});

// app.listen(process.env.PORT || 3000, (req, res) => {
//   console.log("Working");
// });
