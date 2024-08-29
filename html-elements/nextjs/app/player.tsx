"use server";
import { ReactElement } from "react";

export type Player = {
  name: string;
  score: number;
};

const Player = async ({ name, score }: Player): Promise<ReactElement> => {
  return (
    <div>
      {/* <Image src="/player.png" width={50} height={50} /> */}
      <span>{name}</span>
      <span>{score}</span>
    </div>
  );
};

export default Player;
