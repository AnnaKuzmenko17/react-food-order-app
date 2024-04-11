import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";
import { currFormatter } from "../util/formatting";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalPrice = cartCtx.items.reduce((totalPrice, meal) => {
    return totalPrice + meal.price * meal.quantity;
  }, 0)

  function handleCloseCart() {
    userProgressCtx.closeCart()
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
      <h2>Cart</h2>
      <ul>
        {cartCtx.items.map((item) => 
          <CartItem 
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onIncrease={() => cartCtx.addItem(item)}
          onDecrease={() => cartCtx.removeItem(item.id)}
          />
        )}
      </ul>
      <p className="cart-total">{currFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>Close</Button>
        <Button onClick={handleCloseCart}>Go to Checkout</Button>
      </p>

    </Modal>
  );
}