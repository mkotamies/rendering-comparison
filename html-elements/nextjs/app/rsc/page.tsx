import Players from "../players";
import players from "../../../../players.json";
import PlayerComp from "../player";

export default function Home() {
  return (
    <main>
      {players.players.map((player) => (
        <PlayerComp key={player.name} name={player.name} score={player.score} />
      ))}
      ;
    </main>
  );
}
