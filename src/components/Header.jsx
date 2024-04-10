import headerLogo from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import { useContext } from 'react'

export default function Header() {
  const cartCtx = useContext(CartContext);
  const totalQuantity = cartCtx.items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <header id="main-header">
      <div id='title'>
        <img src={headerLogo} alt="a restaurant" />
        <h1>reactfood</h1>
      </div>
      <p>
        <Button textOnly>Cart ({totalQuantity})</Button>
      </p>
    </header>
  );
}