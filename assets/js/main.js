
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 61
const limit = 12
let offset = 0;

function verDetalhes(pokemonId){
    carregarDetalhesPokemon(pokemonId) // Função que vai carregar os detalhes diretamente
// Redireciona para a página de detalhes com o ID do Pokémon
    window.location.href = `details.html?id=${pokemonId}` 
}

function convertPokemonToLi(pokemon) {
    return `
         <li class="pokemon ${pokemon.type}" onclick="verDetalhes(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="abilities">
              <p>Habilidades:</p>
              <ul>
               ${pokemon.skills.map(skill => `<li>${skill}</li>`).join('')}
              </ul>
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

// Verifique se os elementos da modal já existem no DOM
const modal = document.getElementById('pokemonModal');
const modalImage = document.getElementById('modalImage');
const modalPokemonName = document.getElementById('modalPokemonName');
const modalPokemonType = document.getElementById('modalPokemonType');
const modalPokemonSkills = document.getElementById('modalPokemonSkills');
const modalPokemonWeight = document.getElementById('modalPokemonWeight');
const modalPokemonHeight = document.getElementById('modalPokemonHeight');
const closeModal = document.getElementById('closeModal');

// Função para abrir a modal com a imagem e as informações do Pokémon clicado
function abrirModal(pokemon) {
    modal.style.display = "block"; // Exibe a modal
    modalImage.src = pokemon.photo; // Define a imagem
    modalPokemonName.innerText = pokemon.name; // Define o nome do Pokémon
    modalPokemonType.innerText = pokemon.types.join(', '); // Define os tipos
    modalPokemonSkills.innerText = pokemon.skills.join(', '); // Define as habilidades
    modalPokemonWeight.innerText = pokemon.weight || 'Desconhecido'; // Define o peso
    modalPokemonHeight.innerText = pokemon.height || 'Desconhecido'; // Define a altura
}

// Função para fechar a modal
closeModal.onclick = function () {
    modal.style.display = "none"; // Esconde a modal quando o botão de fechar é clicado
}

// Fecha a modal se clicar fora da modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Modifica a função convertPokemonToLi para adicionar o clique na imagem do Pokémon
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick='abrirModal(${JSON.stringify(pokemon)})'>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="abilities">
                <p>Skill</p>
                <ul>
                    ${pokemon.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
        </li>
    `;
}