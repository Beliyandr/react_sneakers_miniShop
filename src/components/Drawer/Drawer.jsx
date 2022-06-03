import { useState } from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";
import styles from "./Drawer.module.scss";

function Drawer({ onRemove, onClose, items = [], opened }) {
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
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <div className={styles.drawerTitle}>
          <h2> Корзина</h2>
          <img
            onClick={onClose}
            width={30}
            height={30}
            className={styles.closeBtn}
            src="/img/btn_remove.svg"
            alt="remove"
          ></img>
        </div>

        {items.length > 0 ? (
          <>
            <div className={styles.cartItems}>
              {items.map((obj) => {
                return (
                  <div key={obj.id} className={styles.cartItem}>
                    <img
                      width={70}
                      height={70}
                      src={obj.img}
                      alt="Кросовки"
                      className="mr-20"
                    />
                    <div className={styles.cartName}>
                      <p className="mb-5 ">{obj.name}</p>
                      <b>{obj.price} грн </b>
                    </div>
                    <img
                      className={styles.removeBtn}
                      src="img/btn_remove.svg"
                      alt="remove"
                      onClick={() => onRemove(obj.id)}
                    ></img>
                  </div>
                );
              })}
            </div>
            <div className={styles.cartTotalBlock}>
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
                className={styles.greenButton}
              >
                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            name={isOrderCompleted ? "Заказ оформлен!" : "Корзина пустая"}
            image={
              isOrderCompleted
                ? "img/completed_order.jpg"
                : "img/empty-cart.jpg"
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
