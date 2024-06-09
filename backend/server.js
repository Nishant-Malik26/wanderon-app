const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
connectDB();
app.use(express.json({ extended: false }));

const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from the frontend service
  credentials: true, 
};
app.use(cookieParser());

app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.get("*", (req, res) => {
  res.status(200).json({
    message: "bad request",
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`${PORT} ankha vikhona lagge`));
