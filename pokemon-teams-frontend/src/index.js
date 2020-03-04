const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainTag = document.querySelector('main')

document.addEventListener("DOMContentLoaded",()=>{
    beginFetch()

    addEventListeners()
})
    

function beginFetch() {
   return fetch(TRAINERS_URL).then( resp => resp.json())
   .then(obj => addTrainers(obj))
  }
function addTrainers(obj){
    for(const trainer of obj){
        createTrainer(trainer)
    let template = createTrainer(trainer);
    mainTag.innerHTML += template
    }
}

function createTrainer(trainer){
    let pokemonsList = addPokeToDom(trainer.pokemons);
    let template = `
    <div class="card" data-id="${trainer.id}">
        <p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul>
            ${pokemonsList}
        </ul>
      </div>
  `; 
    return template;
}

function addPokeToDom(pokemonArry) {   
    let pokemonsList = '';
    for (const pokemon of pokemonArry) {
      pokemonsList += createPokemon(pokemon);
    }
    return pokemonsList;
  }

function createPokemon(pokemon) {
    return `
         <li>
          ${pokemon.nickname} (${pokemon.species})
         <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
         </li>`;
  }

function releasePokemon(e) {
    debugger
    if (e.target.className == "release") {
      const pokemon = e.target.parentElement;
      const pokemonID = e.target.dataset.pokemonId;
  
      fetch(`${POKEMONS_URL}/${pokemonID}`, { method: "DELETE" });
        debugger
      pokemon.remove();
}
}

function addPokemon(e) {

  console.log("Pie")
  }
function addEventListeners(){
   
    const addPokemonBtns = document.querySelectorAll(".card p + button");
    const releaseBtns = document.querySelectorAll(".card .release");
    debugger
    releaseBtns.forEach(btn => btn.addEventListener("click", releasePokemon));
    addPokemonBtns.forEach(btn => btn.addEventListener("click", addPokemon));
    }