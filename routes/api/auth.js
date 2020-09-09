const express = require("express");
const router = express.Router();

//@route GET api/auth
//@desc  initial route
//@access Public

router.get("/", (req, res) => {
  res.send("Auth Route");
});

module.exports = router;
