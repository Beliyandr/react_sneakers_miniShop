// import bd from "./bd";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import { Header } from "./components/Header";

import { React, useState } from "react";
import { useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch("https://62910cbf27f4ba1c65c71f44.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItems(data);
      });
  }, []);

  const onAddToCart = (obj) => {
    // if (cartItems.filter((item) => item.id === obj.id)) {
    //   setCartItems((prev) => [...prev.filter((p) => p.id !== obj)]);
    // }
    setCartItems((prev) => [...prev, obj]);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  console.log(cartItems);
  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer onClose={() => setCartOpened(false)} items={cartItems} />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content">
        <div className="top align-center">
          <h1>
            {searchValue ? `Поиск по запросу ${searchValue}` : "Все кроссовки"}
          </h1>
          <div className="search-block">
            <button className="search"></button>
            <input
              type="text"
              placeholder="поиск..."
              onChange={onChangeSearchInput}
            />
          </div>
        </div>
        <div className="sneakers d-flex flex-wrap ">
          {items.map((item) => (
            <Card
              key={item.id}
              id="1"
              name={item.name}
              price={item.price}
              img={item.img}
              onFavorite={() => {
                console.log("Добавили в закладки");
              }}
              onPlus={(obj) => {
                onAddToCart(obj);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
