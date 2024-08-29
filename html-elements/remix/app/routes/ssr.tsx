import players from "../../../../players.json";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  return players.players;
}

export default function SSR() {
  const players = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {players.map((player) => {
        return (
          <div key={player.name}>
            <span>{player.name}</span>
            <span>{player.score}</span>
          </div>
        );
      })}
    </div>
  );
}
