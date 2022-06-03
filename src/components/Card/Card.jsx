import styles from "./Card.module.scss";

import ContentLoader from "react-content-loader";

import React, { useContext, useState } from "react";

import AppContext from "../../context/context";

function Card({
  id,
  onFavorite,
  name,
  price,
  img,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = useContext(AppContext);

  // const [isAdded, setIsAdded] = useState(added);
  const [isFavorise, setisFavorite] = useState(favorited);

  const onClickPlus = () => {
    console.log({ id, name, price, img });
    onPlus({ id, name, price, img });
    // setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ id, name, price, img });
    setisFavorite(!isFavorise);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={160}
          height={265}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="164" rx="5" ry="5" width="160" height="15" />
          <rect x="0" y="0" rx="0" ry="0" width="160" height="155" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="225" rx="5" ry="5" width="80" height="24" />
          <rect x="124" y="219" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            <img
              width={20}
              height={20}
              src={
                isFavorise ? "/img/heart_liked.svg" : "/img/heart_unliked.svg"
              }
              alt="liked"
              onClick={onClickFavorite}
            />
          </div>
          <img src={img} alt="Кроссовки" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b> {price} грн</b>
            </div>
            <button className={styles.button} onClick={onClickPlus}>
              {onPlus && (
                <img
                  className={styles.plus}
                  src={
                    isItemAdded(id)
                      ? "/img/button_checked.svg"
                      : "/img/button_unchecked.svg"
                  }
                  alt="Кнопка добавить"
                />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
