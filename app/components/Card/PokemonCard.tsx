'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { likePokemon } from "@/server/pokemon-actions"
import Image from "next/image"
import { useState } from "react"
import { useServerAction } from "zsa-react"
import { Heart, Weight, Ruler, Zap, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    const [likes, setLikes] = useState(0)
    const { data, isPending, execute } = useServerAction(likePokemon)

    const handleLike = async () => {
        const [data] = await execute({ likes });
        if (data) setLikes(data);
    }

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{pokemon.name}</span>
                    <Badge variant="outline">{pokemon.type}</Badge>
                </CardTitle>
                <CardDescription>{pokemon.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative mb-4">
                    <AspectRatio ratio={1}>
                        <Image src={pokemon.image} alt={pokemon.name} fill className="object-contain" />
                    </AspectRatio>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                        <Weight className="w-4 h-4 mr-2" />
                        <span>{pokemon.weight} kg</span>
                    </div>
                    <div className="flex items-center">
                        <Ruler className="w-4 h-4 mr-2" />
                        <span>{pokemon.height} m</span>
                    </div>
                    <div className="flex items-center">
                        <Zap className="w-4 h-4 mr-2" />
                        <span>Attack: {pokemon.attack}</span>
                    </div>
                    <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        <span>Defense: {pokemon.defense}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={isPending}
                    onClick={handleLike}
                >
                    <Heart className={`w-4 h-4 mr-2 ${likes > 0 ? 'fill-red-500' : ''}`} />
                    Like
                </Button>
                <div className="flex items-center">
                    <span className="mr-2">Likes:</span>
                    <span>{isPending ? "Saving..." : data}</span>
                </div>
            </CardFooter>
        </Card>
    )
}