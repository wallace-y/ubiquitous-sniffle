import { pokemonList } from "../api-calls-and-data/pokemon-data/pokemonList.js";


document.addEventListener("DOMContentLoaded", function () {
  
  let pokemonHtmlImage = document.getElementById("pokemonImage");
  let currentPokemonIndex = 0;
  let currentPokemonId = 1;
  let currentPokemonName = "bulbasaur";
  let score = 0;
  let nextNotGuessed = pokemonList.find(pokemon => pokemon.alreadyGuessed === undefined)


  function nextPokemon() {
    currentPokemonIndex++;
    currentPokemonId++;
    if (currentPokemonIndex > 150) {
      currentPokemonIndex = 0;
      currentPokemonId = 1;
    }
    pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;
    fetchPokemonName();
    displayCorrectMessage()
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
    displayCorrectMessage();
    pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;
  }

  function fetchPokemonName() {
    // const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
    // const data = await res.json();
    currentPokemonName = pokemonList[currentPokemonIndex].name;
    // currentPokemonName = data.results[currentPokemonIndex].name;

    console.log(currentPokemonName);
  }

  function firstNotGuessed() {
    nextNotGuessed = pokemonList.find(pokemon => pokemon.alreadyGuessed === undefined)
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
      firstNotGuessed()
      console.log(nextNotGuessed)

    }
  }

  function setScore() {
    score++;
    document.getElementById("score").innerHTML = `Score ${score}/151`;
    console.log(score);
  }

  function displayCorrectMessage() {
    const successMessage = document.getElementById("success-message");
    console.log(pokemonList[currentPokemonIndex].alreadyGuessed)
    pokemonList[currentPokemonIndex].alreadyGuessed === undefined ? successMessage.setAttribute("hidden",true) : successMessage.removeAttribute("hidden");
  }

  document.getElementById("nextButton").addEventListener("click", nextPokemon);
  document.getElementById("prevButton").addEventListener("click", prevPokemon);
  document
    .getElementById("pokemonGuess")
    .addEventListener("input", guessPokemon);
    document.addEventListener("keydown", function(event) {
      if (event.key === "ArrowLeft") {
        // left arrow key pressed
        prevPokemon();
      } else if (event.key === "ArrowRight") {
        // right arrow key pressed
        nextPokemon();
      }
    });
    
});


