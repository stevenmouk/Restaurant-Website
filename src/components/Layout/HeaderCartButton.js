import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Store/cart-context";

import CartIcon from "../Cart/CartIcon";
import clases from "./HeaderCartButton.module.css";

export default function HeaderCartButton(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const { items } = cartCtx;

  const btnClasses = `${clases.button} ${btnIsHighlighted ? clases.bump : ""}`;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={clases.badge}>{numberOfCartItems}</span>
    </button>
  );
}
