import {
  ButtonHTMLAttributes,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
} from "react";

export interface CustomButtonProps {
  title: string;
  type?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}

export interface SearchManufacturerProps {
  manufacturer: String;
  setManufacturer: Dispatch<SetStateAction<string>>;
}

export interface Car {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}
export interface CarCardProps {
  car: Car;
}

export interface FilterProps {
  manufacturer: string;
  model: string;
  year: number;
  fuel: string;
  limit: number;
}

export interface Options {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: Options[];
}
