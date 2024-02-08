import axios from "axios";
import BurgerMenuIcon from "./BurgerMenuIcon";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import NavbarItems from "./NavbarItems";
import React, { useState } from "react";

function Navbar(props) {
  
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
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isMenuClicked, setMenuIsClicked] = useState(false);
  const screenWidth = window.innerWidth;

  function toggleMenuIsClicked() {
    setMenuIsClicked(!isMenuClicked);
  }

  return (
        <div className="navbar-container">
          <img id="logo" src="/images/eBike_logo.png" alt="logo" />
          {screenWidth <= 600 ? <BurgerMenuIcon onClick={toggleMenuIsClicked}/> : <NavbarItems />}

          {isMenuClicked && <NavbarItems />}
          
          {props.isAuthenticated ? <img src={LocalMallIcon} alt="cart" /> : <div>Login/Register</div>}
        </div>
  );
}

export default Navbar;
