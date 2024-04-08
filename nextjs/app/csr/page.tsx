"use client";
import { useEffect, useState } from "react";
import Players from "../players";
import playersJson from "../../../players.json";
import type { Players as PlayersType } from "../players";

export default function Home() {
  const [players, setPlayers] = useState<PlayersType>([]);
  useEffect(() => {
    setPlayers(playersJson.players);
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Players players={players} />
    </main>
  );
}
