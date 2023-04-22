const axios = require("axios");
const fsPromise = require("fs/promises");
const express = require("express");
const app = express();
const port = 3000;

// axios
//   .get("https://pokeapi.co/api/v2/pokemon?limit=151")
//   .then((pokemon) => {
//     // console.log(pokemon.data.results)
//     fsPromise.writeFile(
//       "api-calls-and-data/pokemon-data/list-of-pokemon-names.txt",
//       JSON.stringify(pokemon.data.results,null,2),
//       { encoding: "utf-8" }
//     );
//   })
//   .catch((err) => {
//     console.log(err);
//   });


app.get("/", function (res, res) {
  res.sendFile("/home/cam/projectFolder/pokemon-guesser/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
