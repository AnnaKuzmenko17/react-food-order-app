import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: '',
  openCart: () => {},
  closeCart: () => {},
  openCheckout: () => {},
  closeCheckout: () => {}
})

export function UserProgressContextProvider({children}) {
  const [ userProgress, setUserProgress ] = useState('');

  const userProgressContext = {
    progress: userProgress,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout
  }

  function openCart() {
    setUserProgress('cart');
  };

  function closeCart() {
    setUserProgress('');
  };

  function openCheckout() {
    setUserProgress('checkout');
  };

  function closeCheckout() {
    setUserProgress('')
  };

  return <UserProgressContext.Provider value={userProgressContext}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext;