const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetail = document.getElementById('PokemonDetail')

const maxRecords = 1000
const limit = 10
let offset = 0;


function convertPokemonToLi(pokemon) {

    return `
            <li id="${pokemon.number}" class="pokemon ${pokemon.type}
                onclick="pokemonDetail.innerHTML = openPokemonDetailById(${pokemon})
            ">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function openPokemonDetailById(pokemon) {
    
    return `
        <div id=${pokemonDetail}>
            <div class="modal-content">
                <h1>${pokemon.name}</h1>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                <p>Number: ${pokemon.number}</p>
                <p>Type: ${pokemon.type}</p>
                <p>Types: ${pokemon.types}</p>
            </div>
        </div>
    `
}

