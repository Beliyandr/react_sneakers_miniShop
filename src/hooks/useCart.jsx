import { useContext } from "react";
import AppContext from "../context/context";

export const useCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return { cartItems, setCartItems, totalPrice };
};
