import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as StoreLogo } from '../../assets/logo.svg';
import { UserContext } from '../../context/user.contex';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styling.scss';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
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
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
