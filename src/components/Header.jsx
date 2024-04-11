import headerLogo from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import { useContext } from 'react'
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalQuantity = cartCtx.items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  function handleOpenCart() {
    userProgressCtx.openCart();
  }

  return (
    <header id="main-header">
      <div id='title'>
        <img src={headerLogo} alt="a restaurant" />
        <h1>reactfood</h1>
      </div>
      <p>
        <Button textOnly onClick={handleOpenCart}>Cart ({totalQuantity})</Button>
      </p>
    </header>
  );
}