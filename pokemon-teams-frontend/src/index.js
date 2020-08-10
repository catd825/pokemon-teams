const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let trainersData = {};
const main = document.querySelector("main")


const getTrainers = () => {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(responseData => {
        trainersData = responseData
        responseData.forEach(renderTrainer)
    })
}

const releasePokemon = (e) => {
    const pokemonLi = e.target.parentElement
    const pokemonId = pokemonLi.dataset.pokemonId
    fetch(POKEMONS_URL + "/" + pokemonId, {method: "DELETE"})
    .then(resp => {pokemonLi.remove()})
}

const renderNewPokemon = (pokemonObj, trainerCard) => {
    console.log(pokemonObj)
    const pokemonUl = trainerCard.lastChild
    const pokemonLi = document.createElement("li")
    pokemonLi.dataset.pokemonId = pokemonObj.id
    pokemonLi.innerHTML = `${pokemonObj.nickname}<button class="release">Release</button>`
    pokemonLi.addEventListener("click", releasePokemon)
    pokemonUl.append(pokemonLi)
}

const addPokemon = (e) => {
    const trainerId = e.target.dataset.trainerId
    const trainerCard = e.target.parentElement
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({"trainer_id": trainerId})
        }
        fetch(POKEMONS_URL, options) 
        .then(resp => resp.json())
        .then(response => renderNewPokemon(response, trainerCard))
    }


const renderTrainer = (trainerObj) => {
    const trainerCard = document.createElement('div')
    trainerCard.classList.add('card')
    trainerCard.dataset.id = trainerObj.id 
    trainerCard.innerHTML = `<p>${trainerObj.name}</p>`

    const addPokemonButton = document.createElement("button")
    addPokemonButton.textContent = `Add Pokemon`
    addPokemonButton.dataset.trainerId = trainerObj.id
    addPokemonButton.addEventListener('click', addPokemon)
    trainerCard.append(addPokemonButton)

    const pokemonUl = document.createElement("ul")
    trainerCard.append(pokemonUl)

    trainerObj.pokemons.forEach(function(pokemon){
        const pokemonLi = document.createElement("li")
        pokemonLi.dataset.pokemonId = pokemon.id
        pokemonLi.innerHTML = `
        ${pokemon.nickname}<button class="release">Release</button>
        `
        pokemonLi.addEventListener("click", releasePokemon)
        pokemonUl.append(pokemonLi)
    })

    main.append(trainerCard)
}


    
getTrainers()


