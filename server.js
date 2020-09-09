const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("API is working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server Started at PORT : ${PORT}`);
  }
});
