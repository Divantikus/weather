import { useContext } from "react";
import { weatherContext } from "src/contexts/contexts";
import style from "./aside.module.scss";
import obl from "src/assets/obl.svg";
import sun from "src/assets/sun.svg";

export function Aside() {
  const { weatherData, asideIsOn, setAside } = useContext(weatherContext);
  const time = weatherData.hourly.time.slice(0, 24);
  const temp = weatherData.hourly.temperature_2m.slice(0, 24);
  const rain = weatherData.hourly.rain.slice(0, 24);
  return (
    <aside className={asideIsOn ? style.asideOn : style.asideOFF}>
      <button
        className={style.closeButton}
        onClick={() => setAside(!asideIsOn)}
      >
        &larr;
      </button>
      <h1 className={style.title}>Почасовой прогноз</h1>
      <p className={style.weatherBlock}>
        <span className={style.tetx}>Время</span>
        <span className={style.tetx}>Прогноз</span>
      </p>
      {time.map((time, index) => (
        <p key={index} className={style.weatherBlock}>
          <span className={style.tetx}>{new Date(time).getHours()}:00</span>
          <img
            className={style.img}
            src={rain[index] >= 1 ? obl : sun}
            alt={rain[index] >= 1 ? obl : sun}
          />
          <span className={style.tetx}>{temp[index]}*</span>
        </p>
      ))}
    </aside>
  );
}
