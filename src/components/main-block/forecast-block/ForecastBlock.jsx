import { useRef } from "react";
import { DailyForecast } from "../daily-forecast/DailyForecast";
import { SideInformation } from "../side-information/SideInformation";
import style from "./forecast-block.module.scss";
export function ForecastBlock({ props2 }) {
  const { weatherData, asideIsOn, setAside } = props2;
  const weekday = useRef();
  const tempNow = Math.trunc(weatherData.current.temperature_2m);
  const paramByDay = {
    days: weatherData.daily.time,
    maxTemp: weatherData.daily.temperature_2m_max,
    minTemp: weatherData.daily.temperature_2m_min,
    probOfPrec: weatherData.daily.precipitation_probability_max,
  };
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
  function scrollFn(event) {
    if (event.deltaY < 0) {
      weekday.current.scrollBy({ top: 0, left: 50 });
    } else {
      weekday.current.scrollBy({ top: 0, left: -50 });
    }
  }

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
        <SideInformation props={indicators} />
        <div
          className={style.weekday}
          onWheel={(event) => scrollFn(event)}
          ref={weekday}
        >
          {paramByDay.days.map((date, index) => (
            <DailyForecast
              key={index}
              temp={{
                maxTemp: paramByDay.maxTemp[index],
                minTemp: paramByDay.minTemp[index],
                probOfPrec: paramByDay.probOfPrec[index],
                date: date,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
