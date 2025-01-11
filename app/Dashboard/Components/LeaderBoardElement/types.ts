import { StaticImageData } from "next/image";

export interface IleaderboardElementProps {
  name: string;
  model?: string;
  money: string;
  index: number;
  img: StaticImageData;
}
