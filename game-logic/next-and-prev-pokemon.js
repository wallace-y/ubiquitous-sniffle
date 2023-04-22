import { pokemonList } from "../api-calls-and-data/pokemon-data/pokemonList.js";

document.addEventListener("DOMContentLoaded", function () {
  let pokemonHtmlImage = document.getElementById("pokemonImage");
  let currentPokemonIndex = 0;
  let currentPokemonId = 1;
  let currentPokemonName = "bulbasaur";
  let score = 0;
  let nextNotGuessed = pokemonList.find(
    (pokemon) => pokemon.alreadyGuessed === undefined
  );

  function nextPokemon() {
    currentPokemonIndex++;
    currentPokemonId++;
    if (currentPokemonIndex > 150) {
      currentPokemonIndex = 0;
      currentPokemonId = 1;
    }
    pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;
    fetchPokemonName();
    displayCorrectMessage();
  }

  function prevPokemon() {
    currentPokemonIndex--;
    currentPokemonId--;
    if (currentPokemonIndex < 0) {
      currentPokemonIndex = 150;
      currentPokemonId = 151;
    }

    fetchPokemonName();
    displayCorrectMessage();
    pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;
  }

  function fetchPokemonName() {
    // const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
    // const data = await res.json();
    currentPokemonName = pokemonList[currentPokemonIndex].name;
    // currentPokemonName = data.results[currentPokemonIndex].name;
  }

  function firstNotGuessed() {
    nextNotGuessed = pokemonList.indexOf(
      pokemonList.find((pokemon) => pokemon.alreadyGuessed === undefined)
    );
    currentPokemonIndex = nextNotGuessed;
    currentPokemonId = nextNotGuessed + 1;
    currentPokemonName = pokemonList[currentPokemonIndex].name;
    pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;
    displayCorrectMessage();
    console.log(currentPokemonId, currentPokemonIndex, currentPokemonName);
  }

  function guessPokemon(e) {
    console.log(currentPokemonId, currentPokemonIndex, currentPokemonName);
    if (e.target.value.toLowerCase() === currentPokemonName) {
      if (pokemonList[currentPokemonIndex].alreadyGuessed === undefined) {
        //set guessed to true
        //increment score
        //display correct message
        pokemonList[currentPokemonIndex].alreadyGuessed = true;
        setScore();
      } else {
        //don't increment score
        //display already guessed message
        console.log("Guessed");
      }
      e.target.value = "";
      nextPokemon();
    }
  }

  function setScore() {
    score++;
    document.getElementById("score").innerHTML = `Score ${score}/151`;
  }

  function displayCorrectMessage() {
    const successMessage = document.getElementById("success-message");
    pokemonList[currentPokemonIndex].alreadyGuessed === undefined
      ? successMessage.setAttribute("hidden", true)
      : successMessage.removeAttribute("hidden");
  }

  function startGame() {
    //start timer
    document.getElementById("startButton").setAttribute("hidden", true);
  }

  document.getElementById("nextButton").addEventListener("click", nextPokemon);
  document.getElementById("prevButton").addEventListener("click", prevPokemon);
  document
    .getElementById("pokemonGuess")
    .addEventListener("input", guessPokemon);
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      // left arrow key pressed
      prevPokemon();
    } else if (event.key === "ArrowRight") {
      // right arrow key pressed
      nextPokemon();
    }
  });
  document
    .getElementById("findNext")
    .addEventListener("click", firstNotGuessed);
  document.getElementById("startButton").addEventListener("click", startGame);
});
