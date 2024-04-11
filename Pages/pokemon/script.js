(async () => {
    const searchParams = getSearchParams()
    const pokemonName = searchParams.get('evolucao')
    setPageTittle()
    const spritImages = await getSpritesImages()
    let imageIndex = 0;
    
    InsertPokemon()
    setNextImageEvent()
    
    function InsertPokemon(){
        document.querySelector('main').innerHTML = `
            <section>
                <h1>${pokemonName}</h1>
                <figure>
                    <img id="pokemon-image" src="${spritImages[0]}" alt="${pokemonName}" />
                    <figcaption>${pokemonName}</figcaption>
                </figure>
            </secion>
        `
    }
    
    function setNextImageEvent(){
        const pokemonImage = document.querySelector("#pokemon-image")
        if(pokemonImage != null){
            pokemonImage.addEventListener('click', () => {
                pokemonImage.src = getPokemonImageIndex()
            })
        }
    }
    
    async function getSpritesImages(){
        const pokemonInfos = await getPokemonInfos(pokemonName)
        const sprites = pokemonInfos.sprites
        const images = Object.values(sprites).filter((item) => typeof item == "string")
        
        return images;
    }
    
    async function getPokemonInfos(pokemonName) {
        return await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`, {
            method: 'GET',
        })).json ()
    }
    
    function getPokemonImageIndex(){
        imageIndex++
        if(imageIndex > 3){
            imageIndex = 0;
        }
        return spritImages[imageIndex]
    }
    
    function getSearchParams() { return new URLSearchParams(window.location.search) }
    
    function setPageTittle() { document.title = `Página do ${pokemonName}` }
})()