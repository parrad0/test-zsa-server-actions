import "server-only"

const MAX_POKEMON_ID = 898;
const API_BASE_URL = 'https://pokeapi.co/api/v2';

async function fetchPokemonData(id: number): Promise<Pokemon> {
  const [pokemonResponse, speciesResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/pokemon/${id}`),
    fetch(`${API_BASE_URL}/pokemon-species/${id}`)
  ]);

  if (!pokemonResponse.ok || !speciesResponse.ok) {
    throw new Error(`Failed to fetch data for Pokémon with ID ${id}`);
  }

  const [pokemonData, speciesData] = await Promise.all([
    pokemonResponse.json(),
    speciesResponse.json()
  ]);

  const englishDescription = speciesData.flavor_text_entries.find(
    (entry: { language: { name: string } }) => entry.language.name === "en"
  )?.flavor_text?.replace(/\f/g, ' ') || "No description available";

  return {
    name: pokemonData.name,
    description: englishDescription,
    image: pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default,
    type: pokemonData.types[0].type.name,
    weight: pokemonData.weight / 10,
    height: pokemonData.height / 10,
    attack: pokemonData.stats.find((stat: { stat: { name: string } }) => stat.stat.name === 'attack').base_stat,
    defense: pokemonData.stats.find((stat: { stat: { name: string } }) => stat.stat.name === 'defense').base_stat
  };
}

async function getRandomPokemonData(count: number = 5): Promise<Pokemon[]> {
  const uniqueIds = new Set<number>();
  while (uniqueIds.size < count) {
    uniqueIds.add(Math.floor(Math.random() * MAX_POKEMON_ID) + 1);
  }

  const pokemonPromises = Array.from(uniqueIds).map(fetchPokemonData);

  try {
    return await Promise.all(pokemonPromises);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return [];
  }
}

export default getRandomPokemonData;