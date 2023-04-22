document.addEventListener("DOMContentLoaded", function () {
  let pokemonHtmlImage = document.getElementById("pokemonImage");
  let currentPokemonId = 0;

  function nextPokemon() {
    currentPokemonId++;
    if (currentPokemonId > 151) {
      currentPokemonId = 1;
    }
    pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;
  }

  function prevPokemon() {
    currentPokemonId--;
    if (currentPokemonId < 1) {
        currentPokemonId = 151;
      }
      pokemonHtmlImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent/${currentPokemonId}.png`;

  }


  document.getElementById('nextButton').addEventListener('click', nextPokemon);
  document.getElementById('prevButton').addEventListener('click', prevPokemon);


});