import { useContext } from "react";
import { weatherContext } from "src/contexts/contexts";

export const useWeatherContext = () => {
  return useContext(weatherContext);
};
