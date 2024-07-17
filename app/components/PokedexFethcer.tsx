import { getPokemons } from "@/server/pokemon-actions";
import Pokedex from "./Pokedex"

const PokedexFetcher = async () => {
    const [initialPokemons] = await getPokemons();
    return (
        <Pokedex initialPokemons={initialPokemons} />
    )
}
export default PokedexFetcher;