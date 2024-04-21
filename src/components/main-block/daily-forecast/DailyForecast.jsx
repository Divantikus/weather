import style from "./daily-forecast.module.scss";
import obl from "../../../assets/obl.svg";
import sun from "../../../assets/sun.svg";
export function DailyForecast({ temp }) {
  const { maxTemp, minTemp, date, probOfPrec } = temp;
  const weekday = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  const [day, dayNumber] = [new Date(date).getDay(), new Date(date).getDate()];
  const isSolar = probOfPrec >= 40 ? true : false;
  return (
    <>
      <div className={style.card}>
        <p className={style.date}>
          {weekday[day]} {dayNumber}
        </p>
        <img className={style.img} src={isSolar ? obl : sun} />
        <p className={style.temperature}>
          {Math.trunc(maxTemp)}° / {Math.trunc(minTemp)}°
        </p>
        <p className={style.sky}>
          {isSolar ? "Возможные осадки" : "Без осадков"}
        </p>
      </div>
    </>
  );
}
