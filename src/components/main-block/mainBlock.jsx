import { useRef } from "react";
import { ForecastBlock } from "./forecast-block/ForecastBlock";
import { Modal } from "./modal/Modal.jsx";
import style from "./main-block.module.scss";
import sun from "../../assets/sun.svg";
import obl from "../../assets/obl.svg";
export function MainBlock({ props }) {
  const { setCity, weatherData, setWeatherData, city, asideIsOn, setAside } =
    props;
  const props2 = { weatherData, asideIsOn, setAside };
  const inputValue = useRef();
  const isRain = weatherData?.current?.rain >= 0.1;
  const isSnowfall = weatherData?.current?.snowfall >= 0.1;
  const preci = isRain || isSnowfall ? true : false;
  const sectionStyle = asideIsOn ? style.mainBlockOFF : style.mainBlock;
  function cityChoosing(event) {
    const newCity = inputValue.current.value;
    if (event.key === "Enter" && newCity !== city) {
      setCity(newCity);
      setWeatherData(undefined);
    }
  }
  return (
    <section
      className={
        weatherData === null
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
        className={style.inputCity}
        type="text"
        ref={inputValue}
        placeholder={city[0].toUpperCase() + city.slice(1)}
      />
      {weatherData === "ERROR" ? (
        <Modal props={weatherData}>
          <h1 className={style.sorryTitle}>
            К сожалению данный адрес не был найден.
            <br />
            Попробуйте ввести другой
          </h1>
        </Modal>
      ) : (
        weatherData && <ForecastBlock props2={props2} />
      )}
    </section>
  );
}
