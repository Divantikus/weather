import { DailyForecast } from "../daily-forecast/DailyForecast";
import { SideInformation } from "../side-information/SideInformation";
import style from "./forecast-block.module.scss";
export function ForecastBlock({ props2 }) {
  const { weatherData, asideIsOn, setAside } = props2;
  const tempNow = Math.trunc(weatherData.current.temperature_2m);
  const indicators = {
    data: weatherData.current,
    measurementUnits: weatherData.current_units,
    uv: weatherData.daily.uv_index_max[0],
  };
  const situation = weatherData.current.rain
    ? "Дождь"
    : weatherData.current.snowfall
    ? "Снегопад"
    : "Чистый воздух";
  return (
    <section className={style.forecastBlock}>
      <p className={style.temperatureNow}>
        {tempNow}°
        <button className={style.detail} onClick={() => setAside(!asideIsOn)}>
          More
        </button>
      </p>
      <p className={style.condition}>{situation}</p>
      <p className={style.feelsLike}>
        По ощущению: {tempNow < 0 ? tempNow - 6 : tempNow + 6}°
      </p>
      <div className={style.flexContainer}>
        <SideInformation indicators={indicators} />
        <DailyForecast weatherData={weatherData} />
      </div>
    </section>
  );
}
