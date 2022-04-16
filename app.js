const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectBD = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connectBD(process.env.MONGO_URI);
    app.listen(PORT, console.log(`server is listening on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
