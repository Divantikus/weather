import { useEffect, useState } from "react";
import { Aside } from "./components/aside/Aside";
import { MainBlock } from "./components/main-block/mainBlock";
import { Modal } from "./components/main-block/modal/Modal";
import style from "./index.module.scss";

function App() {
  const location = localStorage.getItem("city");
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState(location);
  const [asideIsOn, setAside] = useState(false);
  const props = {
    setCity,
    city,
    setWeatherData,
    weatherData,
    setAside,
    asideIsOn,
  };
  const asideProps = {
    weatherData,
    asideIsOn,
    setAside,
  };
  useEffect(() => {
    if (city) {
      getCord();
    } else {
      setWeatherData("NEW");
    }
    async function getCord() {
      try {
        const locationApiKey = "a9b87d4c2b1242c88a43ab7754fa6dbe";
        const locationURL = `https://api.geoapify.com/v1/geocode/search?text=${city}%20&format=json&apiKey=${locationApiKey}
        `;
        const response = await fetch(locationURL);
        let data = await response.json();
        const [lon, lat] = [data.results[0].lon, data.results[0].lat];
        data = await getWeather(lat, lon);
        setWeatherData(data);
        localStorage.setItem("city", city);
      } catch (error) {
        setWeatherData("ERROR");
      }
    }
    async function getWeather(lat, lon) {
      try {
        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=surface_pressure,temperature_2m,is_day,rain,snowfall,visibility,wind_speed_10m,relative_humidity_2m&wind_speed_unit=ms&hourly=temperature_2m,rain&daily=precipitation_probability_max,uv_index_max,temperature_2m_max,temperature_2m_min,et0_fao_evapotranspiration&timezone=Europe%2FMoscow`;
        const response = await fetch(weatherURL);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Произошла неожиданная ошибка", error);
      }
    }
  }, [city]);
  return (
    <main className={asideIsOn ? style.mainAsideOn : style.mainAsideOFF}>
      {weatherData && <MainBlock props={props} key={"1"} />}
      {weatherData && typeof weatherData !== "string" && (
        <Aside key={"2"} asideProps={asideProps} />
      )}
      {weatherData === undefined && (
        <Modal props={weatherData}>
          <h1 className={style.sorryTitle}>Загрузка...</h1>
        </Modal>
      )}
    </main>
  );
}

export default App;
