import styles from "./Card.module.scss";
import React, { useState, useEffect } from "react";

function Card({ onFavorite, name, price, img, onPlus }) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus({ name, price, img });
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img width={20} height={20} src="/img/heart_unliked.svg" alt="liked" />
      </div>
      <img src={img} alt="Кроссовки" />
      <h5>{name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b> {price} грн</b>
        </div>
        <button className={styles.button} onClick={onClickPlus}>
          <img
            className={styles.plus}
            src={
              isAdded ? "/img/button_checked.svg" : "/img/button_unchecked.svg"
            }
            alt="Кнопка добавить"
          />
        </button>
      </div>
    </div>
  );
}

export default Card;
