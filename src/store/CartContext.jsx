import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
})

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const index = state.items.findIndex((item) => item.id === action.item.id);

    const updatedItems = [...state.items];
    
    if (index > -1) {
      const existingItem = state.items[index];
      const updatedItem = {...existingItem, quantity: existingItem.quantity + 1};
      updatedItems[index] = updatedItem;
    } else {
      const updatedItem = {...action.item, quantity: 1};
      updatedItems.push(updatedItem);
    }

    return {...state, items: updatedItems};
  }

  if (action.type === 'REMOVE_ITEM') {
    const index = state.items.findIndex((item) => item.id === action.id);

    const updatedItems = [...state.items];
    const existingItem = state.items[index];

    if (existingItem.quantity === 1) {
      updatedItems.splice(index, 1);
    } else {
      const updatedItem = {...existingItem, quantity: existingItem.quantity - 1};
      updatedItems[index] = updatedItem;
    }

    return {...state, items: updatedItems}
  }

  if( action.type === 'FINISH_ORDER') {
    return {...state, items: []};
  }

  return state;
}

export function CartContextProvider ( {children} ) {
  
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] })

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  function addItem(item) {
    dispatchCartAction({
      type: 'ADD_ITEM',
      item
    })
  }

  function removeItem(id) {
    dispatchCartAction({
      type: 'REMOVE_ITEM',
      id
    })
  }

  function clearCart() {
    dispatchCartAction({
      type: 'FINISH_ORDER'
    })
  }

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;