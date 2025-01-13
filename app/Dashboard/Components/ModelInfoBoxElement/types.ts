import { StaticImageData } from "next/image";

export interface IModelInfoBoxElementProps {
  img?: StaticImageData | string;
  description?: string;
  name?: string;
  age?: string;
  country?: string;
  drive?: string;
  telegram?: string;
  paypal: string;
  instagram?: { email?: string; password?: string };
  date?: string;
  workers?:
    | {
        id: string;
        img: StaticImageData;
        model: string;
        name: string;
        profit: string;
        profitValue: number;
      }[]
    | undefined;
}
