import React, { useContext } from "react";
import AppContext from "../context/context";

const Info = ({ image, name, description }) => {
  const { setCartOpened } = useContext(AppContext);

  return (
    <div className="emptys">
      <h2 className="d-flex justify-center mb-20"> {name}</h2>
      <h3 className="d-flex justify-center mb-20"> {description}</h3>
      <div className="emptys__block">
        <img src={image} alt="" />
      </div>
      <button className="greenButton " onClick={() => setCartOpened(false)}>
        Вернуться назад <img src="img/arrow.svg" alt="Arrow" />
      </button>
    </div>
  );
};

export default Info;
