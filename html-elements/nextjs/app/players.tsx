import { ReactElement } from "react";

export type Players = {
  name: string;
  score: number;
}[];

const Players = ({ players }: { players: Players }): ReactElement => {
  return (
    <div>
      {players.map((player) => {
        return (
          <div key={player.name}>
            {/* <Image src="/player.png" width={50} height={50} /> */}
            <span>{player.name}</span>
            <span>{player.score}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Players;
