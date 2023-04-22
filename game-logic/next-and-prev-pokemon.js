import { pokemonList } from "../api-calls-and-data/pokemon-data/pokemonList.js";

document.addEventListener("DOMContentLoaded", function () {
  let pokemonHtmlImage = document.getElementById("pokemonImage");
  let currentPokemonIndex = 0;
  let currentPokemonId = 1;
  let currentPokemonName = "bulbasaur";
  let score = 0;

  function nextPokemon() {
    currentPokemonIndex++;
    currentPokemonId++;
    if (currentPokemonIndex > 150) {
      currentPokemonIndex = 0;
      currentPokemonId = 1;
    }
    pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;
    fetchPokemonName();
    console.log(currentPokemonId, currentPokemonIndex);
  }

  function prevPokemon() {
    console.log(currentPokemonId, currentPokemonIndex);
    currentPokemonIndex--;
    currentPokemonId--;
    console.log(currentPokemonId, currentPokemonIndex);
    if (currentPokemonIndex < 0) {
      currentPokemonIndex = 150;
      currentPokemonId = 151;
    }

    fetchPokemonName();
    pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;
  }

  function fetchPokemonName() {
    // const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
    // const data = await res.json();
    currentPokemonName = pokemonList[currentPokemonIndex].name;
    // currentPokemonName = data.results[currentPokemonIndex].name;

    console.log(currentPokemonName);
  }

  function guessPokemon(e) {
    if (e.target.value === currentPokemonName) {

      if (pokemonList[currentPokemonIndex].alreadyGuessed === undefined) {
        //set guessed to true
        //increment score
        //display correct message
        pokemonList[currentPokemonIndex].alreadyGuessed = true;
        setScore();
      } else {
        //don't increment score
        //display already guessed message
        console.log("Guessed")
      }
      e.target.value = "";
      nextPokemon();
    }
  }

  function setScore() {
    score++;
    document.getElementById("score").innerHTML = `Score ${score}/151`;
    console.log(score);
  }

  document.getElementById("nextButton").addEventListener("click", nextPokemon);
  document.getElementById("prevButton").addEventListener("click", prevPokemon);
  document
    .getElementById("pokemonGuess")
    .addEventListener("input", guessPokemon);
});
