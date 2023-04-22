// import pokemon data from an external file
import { pokemonList } from "../api-calls-and-data/pokemon-data/pokemonList.js";

// Wait for the DOM to load before executing code.
document.addEventListener("DOMContentLoaded", function () {
  // Get a reference to the Pokemon image element.
  let pokemonHtmlImage = document.getElementById("pokemonImage");
  // Initialize variables.

  let currentPokemonIndex = 0;
  let currentPokemonId = 1;
  let currentPokemonName = "bulbasaur";
  let score = 0;
  // Find the next Pokemon that has not yet been guessed.

  let nextNotGuessed = pokemonList.find(
    (pokemon) => pokemon.alreadyGuessed === undefined
  );

  // Move to the next Pokemon.
  function nextPokemon() {
    currentPokemonIndex++;
    currentPokemonId++;

    // If we have reached the end of the list, start over.
    if (currentPokemonIndex > 150) {
      currentPokemonIndex = 0;
      currentPokemonId = 1;
    }

    // Update the image and fetch the name of the current Pokemon.
    pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;
    fetchPokemonName();
    displayCorrectMessage();
  }

  // Move to the previous Pokemon.
  function prevPokemon() {
    currentPokemonIndex--;
    currentPokemonId--;
    // If we have reached the beginning of the list, go to the end.
    if (currentPokemonIndex < 0) {
      currentPokemonIndex = 150;
      currentPokemonId = 151;
    }
    // Update the image and fetch the name of the current Pokemon.
    fetchPokemonName();
    displayCorrectMessage();
    pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;
  }

  // Fetch the name of the current Pokemon.
  function fetchPokemonName() {
    currentPokemonName = pokemonList[currentPokemonIndex].name;
  }

  // Find the first Pokemon that has not yet been guessed.
  function firstNotGuessed() {
    // find the index of the first pokemon that has not been guessed yet
    nextNotGuessed = pokemonList.indexOf(
      pokemonList.find((pokemon) => pokemon.alreadyGuessed === undefined)
    );
    // update the current pokemon index and ID to the next not guessed pokemon
    currentPokemonIndex = nextNotGuessed;
    currentPokemonId = nextNotGuessed + 1;
    // update the current pokemon name and image
    currentPokemonName = pokemonList[currentPokemonIndex].name;
    pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;
    // display the correct message and log some information to the console
    displayCorrectMessage();
    console.log(currentPokemonId, currentPokemonIndex, currentPokemonName);
  }

  // Check if the user has guessed the correct Pokemon.
  function guessPokemon(e) {
    console.log(currentPokemonId, currentPokemonIndex, currentPokemonName);
    if (e.target.value.toLowerCase() === currentPokemonName) {
      if (pokemonList[currentPokemonIndex].alreadyGuessed === undefined) {
        // if pokemon hasn't been guessed before, set alreadyGuessed to true,
        // increment score and display correct message
        pokemonList[currentPokemonIndex].alreadyGuessed = true;
        setScore();
      } else {
        // if pokemon has been guessed before, don't increment score,
        // display already guessed message
        console.log("Guessed");
      }
      e.target.value = "";
      nextPokemon();
    }
  }

  function setScore() {
    // increment score and display it

    score++;
    document.getElementById("score").innerHTML = `Score ${score}/151`;
  }

  function displayCorrectMessage() {
    const successMessage = document.getElementById("success-message");
    // if pokemon has not been guessed before, display correct message,
    // otherwise hide it
    pokemonList[currentPokemonIndex].alreadyGuessed === undefined
      ? successMessage.setAttribute("hidden", true)
      : successMessage.removeAttribute("hidden");
  }

  function startGame() {
    // start timer, change start button text to "Give up", remove click event listener,
    // add click event listeners for next and prev buttons, display the guess input and
    // start message, add input event listener for guess input, add keydown event listener
    // for left and right arrow keys, add click event listener for find next button    document.getElementById("startButton").innerHTML = "Give up";
    timer();
    document
      .getElementById("startButton")
      .removeEventListener("click", startGame);
    document
      .getElementById("nextButton")
      .addEventListener("click", nextPokemon);
    document
      .getElementById("prevButton")
      .addEventListener("click", prevPokemon);
    document.getElementById("startMessage").innerHTML = "Who's that Pokémon?";
    document.getElementById("pokemonGuess").removeAttribute("hidden");
    document.getElementById("pokemonGuess").removeAttribute("hidden");
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
  }

  function timer() {
    // start the timer, display time elapsed every second, add click event listener
    // for stop button to stop the timer and display score and time elapsed
    document.getElementById("timer").removeAttribute("hidden");
    let count = 0;
    const interval = setInterval(() => {
      count++;
      document.getElementById("timer").innerHTML = `Time elapsed ${count}s`;
    }, 1000);

    const stopButton = document.getElementById("startButton");
    stopButton.addEventListener("click", () => {
      clearInterval(interval);
      document.getElementById(
        "timer"
      ).innerHTML = `You scored ${score}/151 in ${count} seconds.`;
    });
  }

  document.getElementById("startButton").addEventListener("click", startGame);
});
