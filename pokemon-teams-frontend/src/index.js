const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainTag = document.querySelector('main')

document.addEventListener("DOMContentLoaded",()=>{
    beginFetch()
   
    
})
    

function beginFetch() {
    
  fetch(TRAINERS_URL).then( resp => resp.json())
   .then(obj => {
    addTrainers(obj)})
  }
function addTrainers(obj){
    for(const trainer of obj){
        createTrainer(trainer)
    let template = createTrainer(trainer);
    mainTag.innerHTML += template
    
    }
    addEventListeners()
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
//   let  addBtn = template.querySelector("button")
//   let removeBtn = pokemonsList.getElementbyTagName("button")
//   removeBtn.addEventListener("click", releasePokemon)
//     addBtn.addEventListener("click", addPokemon)
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
         </li>`
         
  }

function releasePokemon(e) {
    if (e.target.className == "release") {
      const pokemon = e.target.parentElement;
      const pokemonID = e.target.dataset.pokemonId;
  
      fetch(`${POKEMONS_URL}/${pokemonID}`, { method: "DELETE" });
      pokemon.remove();
}
}

function addPokemon(e) {
    debugger
    trainerId = e.target.dataset.trainerId
    trainerUl = e.target.nextSibling.nextSibling
    if (trainerUl.childElementCount <= 6){
    let config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ trainer_id: trainerId })
      };
  
      fetch(POKEMONS_URL, config)
        .then(resp => resp.json())
        .then(pokemon => {
          let pokemonElmt = createPokemon(pokemon);
          trainerUl.innerHTML += pokemonElmt;
        })
        .catch(error => console.log(error));
    } else {
        error = " Teams can be max 6"
        alert(error)
    }
    }
  
 function addEventListeners(){
    

    const addPokemonBtns = document.querySelectorAll(".card p + button");
    const releaseBtns =  document.querySelectorAll(".card .release");
    releaseBtns.forEach(btn => btn.addEventListener("click", releasePokemon));
    addPokemonBtns.forEach(btn => btn.addEventListener("click", addPokemon));

    }