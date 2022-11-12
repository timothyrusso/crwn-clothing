import { createContext, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find((cartItem) => addCartItem.id == productToAdd.id)
  // Increment quantity
  if (existingCartItem) {
    // Return new array with modified cartItems
    return cartItems.map((cartItem) => cartItem.id == productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
  }
  // Return new array with new cart item 
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = { isCartOpen, setIsCartOpen, addCartItem, cartItems };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
