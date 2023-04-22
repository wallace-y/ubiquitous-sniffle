document.addEventListener("DOMContentLoaded", function () {
  let pokemonHtmlImage = document.getElementById("pokemonImage");
  let currentPokemonIndex = 0;
  let currentPokemonId = 1;
  let currentPokemonName = "bulbasaur";

  async function nextPokemon() {
    currentPokemonIndex++;
    currentPokemonId++;
    if (currentPokemonIndex > 150) {
      currentPokemonIndex = 0;
      currentPokemonId = 1;
    }
    pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;
    await fetchPokemonName();
    console.log(currentPokemonId, currentPokemonIndex);
  }

  async function prevPokemon() {
    console.log(currentPokemonId, currentPokemonIndex);
    currentPokemonIndex--;
    currentPokemonId--;
    console.log(currentPokemonId, currentPokemonIndex);
      if (currentPokemonIndex < 0) {
        currentPokemonIndex = 150;
        currentPokemonId = 151;
      }

      await fetchPokemonName();
      pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;
  
  }

  async function fetchPokemonName() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
    const data = await res.json();
    currentPokemonName = data.results[currentPokemonIndex].name;
    console.log(currentPokemonName)
  }

  document.getElementById("nextButton").addEventListener("click", nextPokemon);
  document.getElementById("prevButton").addEventListener("click", prevPokemon);
});