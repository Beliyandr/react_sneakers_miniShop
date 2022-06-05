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
    try {
    } catch (error) {}

    async function fetchData() {
      try {
        setIsLoading(true);

        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get(mockapiUrl + "cart"),
            axios.get(mockapiUrl + "favorites"),
            axios.get(mockapiUrl + "items"),
          ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибки при первой загрузке данных");
        console.log("Ошибки при первой загрузке данных", error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(`${mockapiUrl}cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(mockapiUrl + "cart", obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            } else {
              return item;
            }
          })
        );
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
      console.log("Ошибка при добавлении в корзину", error);
    }
  };

  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) => {
        return prev.filter((item) => Number(item.id) !== Number(id));
      });
      await axios.delete(`${mockapiUrl}cart/${id}`);
    } catch (error) {
      console.log("Ошибка удаления из корзины", error);
      alert("Ошибка удаления из корзины");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((item) => item.id === obj.id)) {
        await axios.delete(`${mockapiUrl}favorites/${obj.id}`);
        // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(mockapiUrl + "favorites", obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
      console.log("Не удалось добавить в фавориты", error);
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
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
        <Drawer
          onClose={() => setCartOpened(false)}
          items={cartItems}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Route exact path="/">
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
        <Route exact path="/favorites">
          <Favorites onAddToFavorite={onAddToFavorite} />
        </Route>
        <Route exact path="/orders">
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
