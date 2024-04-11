const searchParams = new URLSearchParams(window.location.search)
const pokemonName = searchParams.get('evolucao')
document.title = `Página do ${pokemonName}`
InsertPokemon()


async function InsertPokemon(){
    const pokemonInfos = await GetPokemonInfos(pokemonName)
    const imageUrl = pokemonInfos.sprites.front_default
    
    console.log(imageUrl)
    document.querySelector('main').innerHTML = `
        <section>
            <h1>${pokemonName}</h1>
            <figure>
                <img src="${imageUrl}" alt="${pokemonName}" />
                <figcaption>${pokemonName}</figcaption>
                </figure>
        </secion>
    `
}

async function GetPokemonInfos(pokemonName) {
    return await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, {
        method: 'GET',
    })).json ()
}