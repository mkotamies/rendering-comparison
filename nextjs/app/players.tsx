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
            <img
              alt="player image"
              src="https://images.unsplash.com/photo-1711211095357-076c9784660d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={50}
              height={50}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Players;
