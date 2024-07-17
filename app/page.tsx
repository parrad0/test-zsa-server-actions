import { Suspense } from "react";
import PokedexFetcher from "./components/PokedexFethcer";
import { PokedexSkeleton } from "./components/Skeletons";

export default function Home() {

  return (
    <main className="max-w-7xl mx-auto flex min-h-screen flex-col justify-between px-4">
      <h1 className="text-3xl font-bold py-4">Pokedex</h1>
      <h2>Welcome to a random pokemon explorer</h2>
      <Suspense fallback={<PokedexSkeleton />}>
        <PokedexFetcher />
      </Suspense>
    </main>
  );
}
