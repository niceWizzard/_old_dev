import { Car, FilterProps } from "@/types";

export async function fetchCars(car: FilterProps) {
  const headers = {
    "X-RapidAPI-Key": "95d3d45d77mshba48fcd64fc75bbp1c1a3fjsn514df0c1ea27",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const url = new URL("https://cars-by-api-ninjas.p.rapidapi.com/v1/cars");
  Object.entries(car).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );
  const response = await fetch(url, {
    headers,
  });

  const res = await response.json();

  return res;
}

export const generateCarImageUrl = (car: Car, angle?: string) => {
  //key..
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, year, model } = car;
  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("year", year.toString());
  url.searchParams.append("angle", angle ?? "");

  return url.toString();
};

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};
