"use server";
import { ReactElement } from "react";
import Image from "next/image";

export type Player = {
  name: string;
  score: number;
};

const Player = async ({ name, score }: Player): Promise<ReactElement> => {
  return (
    <div>
      <span>{name}</span>
      <span>{score}</span>
      <Image
        alt="player image"
        src="https://images.unsplash.com/photo-1711211095357-076c9784660d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={50}
        height={50}
      />
    </div>
  );
};

export default Player;
