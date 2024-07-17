import { Skeleton } from "@/components/ui/skeleton"

export const PokedexSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ring bg-gray-200 p-4 rounded-md">
            {
                Array.from({ length: 5 }).map((_, index) => (
                    <PokemonCardSkeleton key={index} />
                ))
            }
        </div>
    )
}
const PokemonCardSkeleton = () => {
    return (
        <div className="w-full aspect-square">
            <Skeleton className="w-[350px] h-[500px] rounded-md" />
        </div>
    )
}
