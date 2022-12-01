require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

connectDB();

//setup customer logger
app.use(logger);

//credentials middleware to verify origin is in allowed cors origin
app.use(credentials);

// CORS with config
app.use(cors(corsOptions));

//handle url encoded form data
app.use(express.urlencoded({ extended: false }));

//middleware handles json
app.use(express.json());

//middleware handles cookies
app.use(cookieParser());

//routes
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);

app.use("/api/food", require("./routes/api/food"));
// error handler
app.use(errorHandler);

//connect to DB

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
