const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

//Including the routes
const usersRoutes = require("./routes/api/users");
const profileRoutes = require("./routes/api/profile");
const postsRoutes = require("./routes/api/posts");
const authRoutes = require("./routes/api/auth");

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", usersRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/auth", authRoutes);

//Serve static assets in prouction

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Sever config
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server Started at PORT : ${PORT}`);
  }
});
