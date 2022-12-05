import {
  CardItemContaienr,
  ItemDetails,
  CartItemImage,
} from './cart-item.styles.jsx';

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, qty } = cartItem;
  return (
    <CardItemContaienr>
      <CartItemImage src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {qty} x &#x20AC;{price}
        </span>
      </ItemDetails>
    </CardItemContaienr>
  );
};

export default CartItem;
