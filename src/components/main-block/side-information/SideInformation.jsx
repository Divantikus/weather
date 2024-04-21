import style from "./side-information.module.scss";
export function SideInformation({ props }) {
  const { data, uv, measurementUnits } = props;
  const sections = ["Ветер", "Видимость", "Влажность", "Барометр", "УФ-индекс"];
  const values = [
    data.wind_speed_10m,
    data.visibility,
    data.relative_humidity_2m,
    data.surface_pressure,
    uv,
  ];
  const units = [
    measurementUnits.wind_speed_10m,
    measurementUnits.visibility,
    measurementUnits.relative_humidity_2m,
    measurementUnits.surface_pressure,
    "",
  ];
  return (
    <div className={style.flexContainer}>
      {sections.map((item, index) => (
        <div className={style.point} key={index}>
          <p className={style.pointName}>{item}</p>
          <p className={style.meaning}>
            {values[index]} {units[index]}
          </p>
        </div>
      ))}
    </div>
  );
}
