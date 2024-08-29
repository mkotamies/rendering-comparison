import { useServerSideQuery, Page } from "rakkasjs";
import playerData from "../../../../players.json";

const SSR: Page = function SSR() {
  const players = useServerSideQuery(() => {
    return playerData.players;
  });

  return (
    <main>
      {players &&
        players.data.map((player) => (
          <div key={player.name}>
            <span>{player.name}</span>
            <span>{player.score}</span>
          </div>
        ))}
    </main>
  );
};

export default SSR;
