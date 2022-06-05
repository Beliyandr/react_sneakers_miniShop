import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../../context/context";
import styles from "./Empty.module.scss";

export const Empty = ({ title, text, img }) => {
  const { setCartOpened } = useContext(AppContext);
  const history = useHistory();
  return (
    <div className={styles.empty}>
      <div className={styles.smile}>
        <img src={"img/" + img} alt="smile" />
      </div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.text}>{text}</div>
      <button
        className={`greenButton ${styles.empty_button}`}
        onClick={() => history.push("/")}
      >
        <img src="img/arrow.svg" alt="Arrow" /> Вернуться назад
      </button>
    </div>
  );
};
