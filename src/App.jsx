import { Aside } from "./components/aside/Aside";
import { MainBlock } from "./components/main-block/mainBlock";
import { Modal } from "./components/main-block/modal/Modal";
import { weatherContext } from "./contexts/contexts.js";
import { useTry } from "./hooks/useTry";
import style from "./index.module.scss";

export const App = () => {
  const contextObj = useTry();
  const { weatherData, asideIsOn } = contextObj;

  return (
    <weatherContext.Provider value={contextObj}>
      <main className={asideIsOn ? style.mainAsideOn : style.mainAsideOFF}>
        {weatherData && <MainBlock key={"1"} />}
        {asideIsOn && <Aside key={"2"} />}
        {weatherData === undefined && (
          <Modal>
            <h1 className={style.sorryTitle}>Загрузка...</h1>
          </Modal>
        )}
      </main>
    </weatherContext.Provider>
  );
};
