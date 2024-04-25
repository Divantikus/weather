import { useEffect, useState } from "react";
import { getCord } from "src/functions/getWeather";

type TypeWeather = undefined | string | {};
type TypeLOcation = string | null;

export const useTry = () => {
  const location: TypeLOcation = localStorage.getItem("city");
  const [weatherData, setWeatherData] = useState<TypeWeather>();
  const [city, setCity] = useState<TypeLOcation>(location);
  const [asideIsOn, setAside] = useState(false);

  useEffect(() => {
    if (city) {
      getCord(setWeatherData, city);
    } else {
      setWeatherData("NEW");
    }
  }, [city]);
  return {
    weatherData,
    setWeatherData,
    asideIsOn,
    setAside,
    city,
    setCity,
  };
};
