import { CartItemContainer, ItemDetails } from './cart-item.styles';
import { FC, memo } from 'react';
import { CartItem as CartItemType } from '../../store/cart/cart.types';

export type CartItemProps = {
  cartItem: CartItemType;
};

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x {price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;
