import style from "./input-error.module.scss";
export function InputError() {
  return (
    <>
      <h1 className={style.title}>
        К сожалению мы не нашли такой населённый пункт
      </h1>
    </>
  );
}
