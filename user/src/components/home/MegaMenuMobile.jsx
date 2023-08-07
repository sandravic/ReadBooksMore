import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/images/icon-120x120.png';
import AppURL from '../../api/AppURL';

const MegaMenuMobile = () => {
  const [menuData, setMenuData] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    axios
      .get(AppURL.AllCategoryDetails)
      .then((response) => {
        if (isMounted) {
          setMenuData(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    let ISBN = localStorage.getItem('ISBN');
    axios
      .get(AppURL.CartCount(ISBN))
      .then((response) => {
        if (isMounted) {
          setCartCount(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      // Clean up any ongoing asynchronous tasks and subscriptions here
      isMounted = false;
    };
  }, []);

  const logout = () => {
    localStorage.clear();
  };

  const handleAccordionClick = (event) => {
    event.target.classList.toggle('active');
    const panel = event.target.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  };

  const menuItems = menuData.map((category, index) => {
    const subItems = category.subcategory_name.map((subCategory, subIndex) => (
      <li key={subIndex}>
        <Link to={'productsubcategory/' + category.category_name + '/' + subCategory.subcategory_name} className="accordionItem">
          {subCategory.subcategory_name}
        </Link>
      </li>
    ));

    return (
      <div key={index.toString()}>
        <button onClick={handleAccordionClick} className="accordionMobile">
          <img className="accordionMenuIconMobile" src={category.category_image} alt="Category Icon" />
          &nbsp; {category.category_name}
        </button>
        <div className="panelMobile">
          <ul>{subItems}</ul>
        </div>
      </div>
    );
  });

  const isLoggedIn = !!localStorage.getItem('token');
  const buttons = isLoggedIn ? (
    <>
      <Link to="/" onClick={logout} className="h4 btn">
        LOGOUT
      </Link>
      <Link to="/notification" className="btn">
        <i className="fa h4 fa-bell"></i>
        <sup>
          <span className="badge text-white bg-danger">2</span>
        </sup>
      </Link>
      <Link to="/cart" className="btn">
        <i className="fa h4 fa-shopping-cart"></i>
        <sup>
          <span className="badge text-white bg-danger">{cartCount}</span>
        </sup>
      </Link>
      <Link to="/favourite" className="btn">
        <i className="fa h4 fa-heart"></i>
        <sup>
          <span className="badge text-white bg-danger">2</span>
        </sup>
      </Link>
    </>
  ) : (
    <>
      <a className="btn">
        <i className="fa h4 fa-mobile-alt"></i>
      </a>
      <Link to="/login" className="h4 btn">
        Login
      </Link>
      <a className="btn">
        <i className="fa h4 fa-user"></i>
      </a>
      <Link to="/register" className="h4 btn">
        Register
      </Link>
      <Link to="/notification" className="btn">
        <i className="fa h4 fa-bell"></i>
        <sup>
          <span className="badge text-white bg-danger">2</span>
        </sup>
      </Link>
      <Link to="/cart" className="btn">
        <i className="fa h4 fa-shopping-cart"></i>
        <sup>
          <span className="badge text-white bg-danger">{cartCount}</span>
        </sup>
      </Link>
      <Link to="/favourite" className="btn">
        <i className="fa h4 fa-heart"></i>
        <sup>
          <span className="badge text-white bg-danger">2</span>
        </sup>
      </Link>
    </>
  );

  return (
    <div className="accordionMenuDivMobile">
      <div className="accordionMenuDivInsideMobile">
        <Link className="nav-brand-mobile" to="/">
          <img className="nav-logo-mobile" src={Logo} alt="Logo" />
          Readbooksmore.com
        </Link>

        {buttons}

        <div>{menuItems}</div>
      </div>
    </div>
  );
  
};

export default MegaMenuMobile;
