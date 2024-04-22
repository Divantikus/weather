import style from "./daily-forecast.module.scss";
import { useRef } from "react";
import obl from "../../../assets/obl.svg";
import sun from "../../../assets/sun.svg";
export function DailyForecast({ weatherData }) {
  const weekday = useRef();
  const paramByDay = {
    days: weatherData.daily.time,
    maxTemp: weatherData.daily.temperature_2m_max,
    minTemp: weatherData.daily.temperature_2m_min,
    probOfPrec: weatherData.daily.precipitation_probability_max,
  };
  const isSolar = paramByDay.probOfPrec >= 40 ? true : false;
  function getDate(index) {
    const weekday = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    const [date, dayNumber] = [
      new Date(paramByDay.days[index]).getDay(),
      new Date(paramByDay.days[index]).getDate(),
    ];
    return [weekday[date], dayNumber];
  }
  function scrollFn(event) {
    if (event.deltaY < 0) {
      weekday.current.scrollBy({ top: 0, left: 50 });
    } else {
      weekday.current.scrollBy({ top: 0, left: -50 });
    }
  }
  return (
    <div
      className={style.weekday}
      onWheel={(event) => scrollFn(event)}
      ref={weekday}
    >
      {paramByDay.days.map((date, index) => {
        return (
          <div key={index} className={style.card}>
            <p className={style.date}>{getDate(index).join(" ")}</p>
            <img className={style.img} src={isSolar ? obl : sun} />
            <p className={style.temperature}>
              {Math.trunc(paramByDay.maxTemp[index])}° /{" "}
              {Math.trunc(paramByDay.minTemp[index])}°
            </p>
            <p className={style.sky}>
              {isSolar ? "Возможные осадки" : "Без осадков"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
