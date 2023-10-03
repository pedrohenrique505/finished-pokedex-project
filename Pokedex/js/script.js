const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonBack = document.querySelector('.pokemon_costa');
const pokemonType = document.querySelector('.pokemon_type');
const pokemonAbility = document.querySelector('.ability');
const BtnNext = document.querySelector('.btn-next');
const BtnPrev = document.querySelector('.btn-prev');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
let PokemonInicial = 1;
const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
    }
}
const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if(data){
    pokemonType.innerHTML = 'Tipo: ' + data.types.map(type => type.type.name);
    pokemonAbility.innerHTML = 'Habilidades: ' + data.abilities.map(ability => ability.ability.name);
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites'
]['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonBack.src = data['sprites'
]['versions']['generation-v']['black-white']['animated']['back_default'];
PokemonInicial = data.id;
pokemonImage.style.visibility = "visible";
pokemonBack.style.visibility = "visible";
    }else{
        pokemonName.innerHTML = 'nem te conto';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.visibility = 'hidden';
        pokemonBack.style.visibility = 'hidden';
    }
}
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
})
BtnPrev.addEventListener('click', () =>{
    if(PokemonInicial > 1){
    PokemonInicial -= 1;
      renderPokemon(PokemonInicial);
    }
})
BtnNext.addEventListener('click', () =>{
      PokemonInicial += 1;
      renderPokemon(PokemonInicial);
})
renderPokemon(PokemonInicial);