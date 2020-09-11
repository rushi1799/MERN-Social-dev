const express = require("express");
const connectDB = require("./config/db");
const app = express();

//Including the routes
const usersRoutes = require("./routes/api/users");
const profileRoutes = require("./routes/api/profile");
const postsRoutes = require("./routes/api/posts");
const authRoutes = require("./routes/api/auth");

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API is working");
});

// Define Routes
app.use("/api/users", usersRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/auth", authRoutes);

// Sever config
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server Started at PORT : ${PORT}`);
  }
});
