import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from './cart-dropdown.styles';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

const CartDropdown = () => {
  const navigate = useNavigate();

  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout');
  }, []);

  const cartItems = useSelector(selectCartItems);

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
