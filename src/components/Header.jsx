export const Header = (props) => {
  return (
    <header className="d-flex justify-between align-center">
      <div className="headerLeft d-flex align-center">
        <img src="/img/logo.svg" alt="Логотип" />
        <div className="headerInfo">
          <h3> React sneakers</h3>
          <p>Магазин лучших кросовок</p>
        </div>
      </div>
      <ul className="headerRigth d-flex">
        <li className="cu-p" onClick={props.onClickCart}>
          <img src="/img/cart.svg" alt="Корзина" />
          <span className="ml-10"> 1205 грн</span>
        </li>
        <li>
          <img src="/img/heart.svg" alt="Like" />
        </li>
        <li>
          <img src="/img/user.svg" alt="Пользователь" />
        </li>
      </ul>
    </header>
  );
};
