import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import AppContext from "../context/context";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { onAddToFavorite, onAddToCart } = useContext(AppContext);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get(
          "https://62910cbf27f4ba1c65c71f44.mockapi.io/orders"
        );
        //   console.log(data.map((obj) => obj.items).flat());
        setOrders(
          data.reduce((prev, obj) => [...prev, ...obj.items], []).flat()
        );
        setIsLoading(false);
      })();
    } catch (error) {
      alert("Ошибка при запросе заказов");
      console.log("Что-то пошло не так с вашими заказми", error);
    }
  }, []);

  return (
    <div className="content">
      <div className="top align-center">
        <h1>Мои заказы</h1>
      </div>
      <div className="sneakers d-flex flex-wrap ">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={isLoading ? index : index}
            onFavorite={onAddToFavorite}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};
