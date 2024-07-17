'use client'

import { Button } from "@/components/ui/button";
import { getPokemons } from "@/server/pokemon-actions";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { PokemonCard } from "./Card/PokemonCard";
import { PokedexSkeleton } from "./Skeletons";

const Pokedex = ({ initialPokemons }: { initialPokemons: Pokemon[] | undefined | null }) => {
    const [pokemons, setPokemons] = useState(initialPokemons);
    const { execute, isPending } = useServerAction(getPokemons);

    const handleRefresh = async () => {
        const [data] = await execute();
        setPokemons(data);
    }

    return (
        <div>
            <div className="flex justify-end py-4">
                <Button className="py-4" disabled={isPending} onClick={handleRefresh}>Refresh Pokemons</Button>
            </div>
            {isPending ? (
                <PokedexSkeleton />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-200 p-4 rounded-md">
                    {pokemons?.map((pokemon: Pokemon, index: number) => (
                        <PokemonCard key={index} pokemon={pokemon} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Pokedex;