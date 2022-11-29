import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/card-dropdown/card-dropdown.component';

import { UserContext } from '../../context/user.contex';
import { CartContext } from '../../context/cart.context';

import { ReactComponent as StoreLogo } from '../../assets/logo.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styling.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
  };

  const cartDropdownHandler = () => {
    setIsCartOpen(true);
  };

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <StoreLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>
              LOG OUT
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              LOGIN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
