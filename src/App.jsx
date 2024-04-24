import { useEffect, useState } from "react";
import { Aside } from "./components/aside/Aside";
import { MainBlock } from "./components/main-block/mainBlock";
import { Modal } from "./components/main-block/modal/Modal";
import { getCord } from "./functions/getWeather.js";
import { weatherContext } from "./contexts/contexts.js";
import style from "./index.module.scss";

export const App = () => {
  const location = localStorage.getItem("city");
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState(location);
  const [asideIsOn, setAside] = useState(false);
  const contextObj = {
    weatherData,
    setWeatherData,
    asideIsOn,
    setAside,
    city,
    setCity,
  };
  useEffect(() => {
    if (city) {
      getCord(setWeatherData, city);
    } else {
      setWeatherData("NEW");
    }
  }, [city]);
  return (
    <weatherContext.Provider value={contextObj}>
      <main className={asideIsOn ? style.mainAsideOn : style.mainAsideOFF}>
        {weatherData && <MainBlock key={"1"} />}
        {asideIsOn && <Aside key={"2"} />}
        {weatherData === undefined && (
          <Modal>
            <h1 className={style.sorryTitle}>Загрузка...</h1>
          </Modal>
        )}
      </main>
    </weatherContext.Provider>
  );
};
