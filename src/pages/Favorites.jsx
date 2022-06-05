import Card from "../components/Card";
import React from "react";

import AppContext from "../context/context";
import { Empty } from "../components/Empty/Empty";

function Favorites({ onAddToFavorite }) {
  const { favorites } = React.useContext(AppContext);

  return (
    <div className="content">
      <div className="top align-center">
        <h1>
          {/* {searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"} */}
          Мои закладки
        </h1>
      </div>
      <div className="sneakers d-flex flex-wrap ">
        {favorites.length < 1 ? (
          <Empty
            title="Закладок нет :("
            text="Вы ничего не добавляли в закладки"
            img="smile_2.jpg"
          />
        ) : (
          ""
        )}
        {favorites.map((item) => (
          <Card
            key={item.id}
            favorited={true}
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
