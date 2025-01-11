import { StaticImageData } from "next/image";

export interface IPaymentModalElementProps {
  workers:
    | {
        name: string;
        model: string;
        profit: string;
        id: string;
        img: StaticImageData;
        profitValue: number;
      }[]
    | undefined;
  changeModal: () => void;
  id?: string;
  refetch: () => void;
}
