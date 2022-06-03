import { Link } from "react-router-dom";

import { useCart } from "../hooks/useCart";

export const Header = (props) => {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center">
      <Link to="/">
        <div className="headerLeft d-flex align-center">
          <img src="/img/logo.svg" alt="Логотип" />
          <div className="headerInfo">
            <h3> React sneakers</h3>
            <p>Магазин лучших кросовок</p>
          </div>
        </div>
      </Link>
      <ul className="headerRigth d-flex">
        <li className="cu-p" onClick={props.onClickCart}>
          <img src="/img/cart.svg" alt="Корзина" />
          <span className="ml-10"> {totalPrice} грн</span>
        </li>
        <li>
          <Link to="/favorites">
            <img src="/img/heart.svg" alt="Закладки" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img src="/img/user.svg" alt="Пользователь" />
          </Link>
        </li>
      </ul>
    </header>
  );
};
