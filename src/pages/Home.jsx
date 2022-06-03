import Card from "../components/Card";
import React from "react";

function Home({
  cartItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  items,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems =
      items &&
      items.filter((item) =>
        item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      );

    return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
      <Card
        key={isLoading ? index : item.id}
        onFavorite={onAddToFavorite}
        onPlus={(obj) => {
          onAddToCart(obj);
        }}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content">
      <div className="top align-center">
        <h1>
          {searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block">
          <button className="search"></button>
          {searchValue ? (
            <img
              width={30}
              height={30}
              className="clear closeBtn"
              src="img/btn_remove.svg"
              alt="clear"
              onClick={() => setSearchValue("")}
            ></img>
          ) : null}
          <input
            type="text"
            placeholder="поиск..."
            onChange={onChangeSearchInput}
            value={searchValue}
          />
        </div>
      </div>
      <div className="sneakers d-flex flex-wrap ">{renderItems()}</div>
    </div>
  );
}

export default Home;
