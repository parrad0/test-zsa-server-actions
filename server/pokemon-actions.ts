"use server"

import { createServerAction } from "zsa";
import getRandomPokemonData from "./repository/pokemonRepository";
import { z } from "zod";

export const getPokemons = createServerAction()
    .handler(async ({ input }): Promise<Pokemon[]> => {
        return await getRandomPokemonData();
    });

export const likePokemon = createServerAction()
    .input(z.object({
        likes: z.number()
    }))
    .handler(async ({ input }) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return input.likes + 1;
    });
