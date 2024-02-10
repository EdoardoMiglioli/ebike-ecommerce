import axios from "axios";
import BurgerMenuIcon from "./BurgerMenuIcon";
import LoginOrCart from "./LoginOrCart";
import NavbarItems from "./NavbarItems";
import React, { useState, useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isMenuClicked, setMenuIsClicked] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  function toggleBurgerMenu() {
    setMenuIsClicked(!isMenuClicked);
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

  /*
  try{
      async () => {
      const response = await axios.get('/api/check-auth');
      }
  } catch (err) {
      console.error('Error checking authentication status:', err);
  }
  setLoggedIn(response.data.isAuthenticated);
  */

  return (
        <div className="navbar-container">
          <a className="logo-anchor" href="/"><img id="logo" src="/images/eBike_logo.png" alt="logo" /></a>
          {screenWidth <= 900 ? <BurgerMenuIcon onClick={toggleBurgerMenu}/> : <NavbarItems isSmallScreen={false}/>}
          {screenWidth >= 900 && <LoginOrCart isLoggedIn={isLoggedIn}/>}

          {isMenuClicked && screenWidth <= 900 && <NavbarItems isSmallScreen={true}/>}
        </div>
  );
}

export default Navbar;
