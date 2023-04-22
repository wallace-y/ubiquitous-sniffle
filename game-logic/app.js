const axios = require("axios");
const fsPromise = require("fs/promises");
const express = require("express");
const app = express();
const port = 3000;



app.get("/", function (res, res) {
  res.sendFile("/home/cam/projectFolder/pokemon-guesser/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
