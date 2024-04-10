import headerLogo from '../assets/logo.jpg'
import Button from './UI/Button'

export default function Header() {
  return <header id="main-header">
    <div id='title'>
      <img src={headerLogo} alt="a restaurant" />
      <h1>reactfood</h1>
    </div>
    <p>
      <Button textOnly>Cart (0)</Button>
    </p>
  </header>
}