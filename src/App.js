// import bd from "./bd";

import Drawer from "./components/Drawer";
import { Header } from "./components/Header";

import React, { useState } from "react";
import { useEffect } from "react";

import { Route } from "react-router-dom";

import axios from "axios";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Orders } from "./pages/Orders";

import AppContext from "./context/context";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mockapiUrl = "https://62910cbf27f4ba1c65c71f44.mockapi.io/";

  useEffect(() => {
    // fetch("https://62910cbf27f4ba1c65c71f44.mockapi.io/items")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setItems(data);
    //   });

    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get(mockapiUrl + "cart");
      const favoritesResponse = await axios.get(mockapiUrl + "favorites");
      const itemsResponse = await axios.get(mockapiUrl + "items");

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`${mockapiUrl}cart/${obj.id}`);
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post(mockapiUrl + "cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`${mockapiUrl}cart/${id}`);
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((item) => item.id === obj.id)) {
        axios.delete(`${mockapiUrl}favorites/${obj.id}`);
        // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(mockapiUrl + "favorites", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        setCartOpened,
        setCartItems,
        onAddToCart,
        onAddToFavorite,
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            onClose={() => setCartOpened(false)}
            items={cartItems}
            onRemove={onRemoveItem}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="/" exact>
          <Home
            cartItems={cartItems}
            items={items}
            searchValue={searchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/favorites" exact>
          <Favorites onAddToFavorite={onAddToFavorite} />
        </Route>
        <Route path="/orders" exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
