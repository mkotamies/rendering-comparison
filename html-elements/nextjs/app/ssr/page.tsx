"use server";
import Players from "../players";
import players from "../../../../players.json";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Players players={players.players} />
    </main>
  );
}
