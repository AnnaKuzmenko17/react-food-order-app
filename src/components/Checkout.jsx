import { useContext } from "react";
import CartContext from "../store/CartContext";
import Modal from "./Modal";
import UserProgressContext from "../store/UserProgressContext";
import Input from "./Input";
import { currFormatter } from "../util/formatting";
import Button from "./UI/Button";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalPrice = cartCtx.items.reduce((totalPrice, meal) => {
    return totalPrice + meal.price * meal.quantity;
  }, 0)

  function handleCloseCheckout() {
    userProgressCtx.closeCheckout()
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries())
    
    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items, 
          customer: customerData
        }
      })
    })
  }

  return <Modal open={userProgressCtx.progress === 'checkout'}>
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <p>Total Amount: {currFormatter.format(totalPrice)}</p>
      <Input label="Full Name" type='text' id='name'/>
      <Input label='Email Adress' type='email' id='email'/>
      <Input label='Street' type='text' id='street'/>
      <div className="control-row">
        <Input label='Postal Code' type='text' id='postal-code'/>
        <Input label='City' type='text' id='city' />
      </div>
      <p className="modal-actions">
        <Button type='button' textOnly onClick={handleCloseCheckout}>Close</Button>
        <Button>Submit Order</Button>
      </p>
    </form>
  </Modal>
}