const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
// connecting to DB
connectDB();
app.use(express.json({ extended: false }));

const corsOptions = {
  origin: "https://wanderon-app-frontend.vercel.app/",
  credentials: true,
};

// for parsing cookies
app.use(cookieParser());
// enabling cors for our backend domain
app.use(cors(corsOptions));

// registration endpoint
app.use("/api/users", require("./routes/api/users"));
// login endpoint
app.use("/api/auth", require("./routes/api/auth"));
// catching any else endpoint
app.get("*", (req, res) => {
  res.status(200).json({
    message: "bad request",
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("Application Connected"));
