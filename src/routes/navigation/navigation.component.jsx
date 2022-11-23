import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as StoreLogo } from '../../assets/logo.svg';

import './navigation.styling.scss';

const Navigation = () => {
  return (
    <Fragment>
      <div className='navigation'>
        <Link
          className='logo-container'
          to='/'
        >
          <StoreLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link
            className='nav-link'
            to='/shop'
          >
            SHOP
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
