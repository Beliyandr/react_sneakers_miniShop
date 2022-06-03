import { useState } from "react";
import Info from "./Info";
import axios from "axios";
import { useCart } from "../hooks/useCart";

function Drawer({ onRemove, onClose, items = [] }) {
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems, setCartItems, totalPrice } = useCart();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://62910cbf27f4ba1c65c71f44.mockapi.io/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const element = cartItems[i];
        await axios.delete(
          "https://62910cbf27f4ba1c65c71f44.mockapi.io/cart/" + element.id,
          []
        );
        await delay(1000);
      }

      // cartItems.forEach((item) => {
      //   axios.delete(
      //     "https://62910cbf27f4ba1c65c71f44.mockapi.io/cart/" + item.id,
      //     []
      //   );
      // });
      // await axios.put("https://62910cbf27f4ba1c65c71f44.mockapi.io/cart", []);
    } catch (error) {
      alert("ваш заказ не создан :(");
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <div className="drawerTitle">
          <h2> Корзина</h2>
          <img
            onClick={onClose}
            width={30}
            height={30}
            className="closeBtn"
            src="/img/btn_remove.svg"
            alt="remove"
          ></img>
        </div>

        {items.length > 0 ? (
          <>
            <div className="cartItems">
              {items.map((obj) => {
                return (
                  <div
                    key={obj.id}
                    className="cartItem d-flex align-center justify-between"
                  >
                    <img
                      width={70}
                      height={70}
                      src={obj.img}
                      alt="Кросовки"
                      className="mr-20"
                    />
                    <div className="cartName mr-10">
                      <p className="mb-5 ">{obj.name}</p>
                      <b>{obj.price} грн </b>
                    </div>
                    <img
                      className="removeBtn"
                      src="/img/btn_remove.svg"
                      alt="remove"
                      onClick={() => onRemove(obj.id)}
                    ></img>
                  </div>
                );
              })}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b> {totalPrice} грн</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b> {(totalPrice / 100) * 5} грн</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            name={isOrderCompleted ? "Заказ оформлен!" : "Корзина пустая"}
            image={
              isOrderCompleted
                ? "/img/completed_order.jpg"
                : "/img/empty-cart.jpg"
            }
            description={
              isOrderCompleted
                ? `Ваш заказ №${orderId} будет передан курьерской доставке`
                : "Добавьте хоть одну пару кросовок"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
