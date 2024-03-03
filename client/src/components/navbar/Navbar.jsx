import axios from "axios";
import BurgerMenuIcon from "./BurgerMenuIcon";
import LoginOrCart from "./LoginOrCart";
import NavbarItems from "./NavbarItems";
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';


function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isMenuClicked, setMenuIsClicked] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const location = useLocation();
  const isProductPage = checkLocation(location.pathname.substring(0, 9), "/product/");
  const logoPath = `/images/${isProductPage ? "eBike_logo_dark" : "eBike_logo"}.png`

  function toggleBurgerMenu() {
    setMenuIsClicked(!isMenuClicked);
  }

  function checkLocation(path, pathToCheck) {
    if (path === pathToCheck) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  try{
    (async () => {
      const response = await axios.get('/api/check-auth');
      const { isAuthenticated } = response.data;
      setLoggedIn(isAuthenticated);
    })();
  } catch (err) {
    console.error('Error checking authentication status:', err);
  }
  
  return (
        <nav className='navbar-container'>
          <a className="logo-anchor" href="/"><img id="logo" src={logoPath} alt="logo" /></a>
          {screenWidth <= 900 ? <BurgerMenuIcon onClick={toggleBurgerMenu} /> : <NavbarItems isSmallScreen={false} isProductPage={isProductPage} />}
          {screenWidth >= 900 && <LoginOrCart isLoggedIn={isLoggedIn} isProductPage={isProductPage} />}

          {isMenuClicked && screenWidth <= 900 && <NavbarItems isSmallScreen={true} isProductPage={isProductPage} />}
        </nav>
  );
}

export default Navbar;
