import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import useHTTP from "../hooks/useHTTP";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./UI/Button";
import Error from "./Error";
import { currFormatter } from "../util/formatting";

const urlConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    error,
    isLoading,
    sendRequest,
    clearData,
    setData
  } = useHTTP('https://food-order-app-form-default-rtdb.firebaseio.com/.json', urlConfig)


  const totalPrice = cartCtx.items.reduce((totalPrice, meal) => {
    return totalPrice + meal.price * meal.quantity;
  }, 0)

  function handleCloseCheckout() {
    userProgressCtx.closeCheckout();
  }

  function handleFinish() {
    userProgressCtx.closeCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd);

    sendRequest(JSON.stringify({
      order: {
        items: cartCtx.items,
        customer: customerData
      }
    }))

    setData({
      order: {
        items: cartCtx.items,
        customer: customerData
      }
    })

    console.log(data)
  }

  let actions = (
    <>
      <Button type='button' textOnly onClick={handleCloseCheckout}>Close</Button>
      <Button type='submit'>Submit Order</Button>
    </>
  )

  if (isLoading) {
    actions = <span>Sending order data...</span>
  }

  if (data && !error) {
    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
      <h2>Succes!</h2>
      <p>Your order was submitted succesfully.</p>
      <p>We will get back to you with more details via email within the next few minutes.</p>
      <p className="modal-actions">
        <Button onClick={handleFinish}>Okay</Button>
      </p>
    </Modal>
  }

  return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <p>Total Amount: {currFormatter.format(totalPrice)}</p>
      <Input label="Full Name" type='text' id='name' />
      <Input label='Email Adress' type='email' id='email' />
      <Input label='Street' type='text' id='street' />
      <div className="control-row">
        <Input label='Postal Code' type='text' id='postal-code' />
        <Input label='City' type='text' id='city' />
      </div>

      {error && <Error title="Failed to submit order" message={error} />}

      <p className="modal-actions">
        {actions}
      </p>
    </form>
  </Modal>
}