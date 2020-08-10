const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let trainersData = {};
const main = document.querySelector("main")

// document.addEventListener("DOMContentLoaded", function(e) {

    const getTrainers = () => {
        fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(responseData => {
            trainersData = responseData
            responseData.forEach(renderTrainer)
            // console.log(trainersData)
        })
    }
    



    const releasePokemon = (e) => {
        const pokemonLi = e.target.parentElement
        const pokemonId = pokemonLi.dataset.pokemonId
        // const options = {
        //     method: “DELETE”
        //   }
        fetch(POKEMONS_URL + "/" + pokemonId, {method: "DELETE"})
        .then(res => {pokemonLi.remove()})
    }

    const renderNewPokemon = (pokemonObj) => {
        console.log(pokemonObj.trainerId)
    }


    const addPokemon = (e) => {

        const trainerId = e.target.dataset.trainerId
        console.log(trainerId)

        const options = {
            method: "POST",
            headers: {
              "content-type": "application/json", 
              "accept": "application/json"
            },
            body: JSON.stringify("trainer_id": trainerId)
          }
          fetch(POKEMONS_URL, options) 
          .then(response => renderNewPokemon(response))
        }


    const renderTrainer = (trainerObj) => {
        const trainerCard = document.createElement('div')
        trainerCard.classList.add('card')
        trainerCard.dataset.id = trainerObj.id 
        trainerCard.innerHTML = `
        <p>${trainerObj.name}</p>
        `
        
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
// })


// <button data-trainer-id="1">Add Pokemon</button>
// <ul>
//     <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//     <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//     <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//     <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//     <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
// </ul>