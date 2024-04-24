import { useRef } from "react";
import { ForecastBlock } from "./forecast-block/ForecastBlock";
import { Modal } from "./modal/Modal.jsx";
import style from "./main-block.module.scss";
import sun from "src/assets/sun.svg";
import obl from "src/assets/obl.svg";
import { useWeatherContext } from "src/hooks/useWeatherContext";
export function MainBlock() {
  const { weatherData, asideIsOn, setAside, city, setWeatherData, setCity } =
    useWeatherContext();
  const inputValue = useRef();
  const isRain = weatherData?.current?.rain >= 0.1;
  const isSnowfall = weatherData?.current?.snowfall >= 0.1;
  const preci = isRain || isSnowfall ? true : false;
  const sectionStyle = asideIsOn ? style.mainBlockOFF : style.mainBlock;
  const placeholder = city
    ? city[0].toUpperCase() + city.slice(1)
    : "Строка поиска";
  const inputStyle = city
    ? style.inputCity
    : `${style.inputCity} ${style.inputNewCity}`;
  function cityChoosing(event) {
    const newCity = inputValue.current.value;
    if (event.key === "Enter" && newCity !== city) {
      setCity(newCity);
      setWeatherData(undefined);
      setAside(false);
    }
  }
  return (
    <section
      className={
        weatherData === "NEW"
          ? style.mainBlockSearch
          : `${sectionStyle} ${preci ? style.mainBlockGrayBg : ""}`
      }
    >
      <img
        className={asideIsOn ? style.imgOFF : style.img}
        src={preci ? obl : sun}
        alt={preci ? "Облако" : "Солнце"}
      />
      <input
        onKeyDown={(event) => cityChoosing(event)}
        className={inputStyle}
        type="text"
        ref={inputValue}
        placeholder={placeholder}
      />
      {weatherData === "ERROR" ? (
        <Modal>
          <h1 className={style.sorryTitle}>
            К сожалению данный адрес не был найден.
            <br />
            Попробуйте ввести другой
          </h1>
        </Modal>
      ) : weatherData !== "NEW" ? (
        <ForecastBlock />
      ) : null}
    </section>
  );
}
