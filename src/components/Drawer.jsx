function Drawer({ onClose, items = [] }) {
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
        <div className="cartItems">
          {items.map((obj) => {
            return (
              <div className="cartItem d-flex align-center justify-between">
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
                ></img>
              </div>
            );
          })}

          {/* <div className="cartItem d-flex align-center justify-between">
            <img
              width={70}
              height={70}
              src="/img/sneakers/1.jpg"
              alt="Кросовки"
              className="mr-20"
            />
            <div className="cartName mr-10">
              <p className="mb-5 ">Мужские Кроссовки Nike Air Max 270</p>
              <b>12999 грн </b>
            </div>
            <img
              className="removeBtn"
              src="/img/btn_remove.svg"
              alt="remove"
            ></img>
          </div>
          <div className="cartItem d-flex align-center justify-between">
            <img
              width={70}
              height={70}
              src="/img/sneakers/1.jpg"
              alt="Кросовки"
              className="mr-20"
            />
            <div className="cartName mr-10">
              <p className="mb-5 ">Мужские Кроссовки Nike Air Max 270</p>
              <b>12999 грн </b>
            </div>
            <img
              className="removeBtn"
              src="/img/btn_remove.svg"
              alt="remove"
            ></img>
          </div>
          <div className="cartItem d-flex align-center justify-between">
            <img
              width={70}
              height={70}
              src="/img/sneakers/1.jpg"
              alt="Кросовки"
              className="mr-20"
            />
            <div className="cartName mr-10">
              <p className="mb-5 ">Мужские Кроссовки Nike Air Max 270</p>
              <b>12999 грн </b>
            </div>
            <img
              className="removeBtn"
              src="/img/btn_remove.svg"
              alt="remove"
            ></img>
          </div>*/}
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b> 21 498 грн</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b> 100 грн</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
