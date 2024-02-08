import axios from "axios";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import React, { useState } from "react";

function Navbar(props) {
  const [isLoggedIn, setLoggedIn] = useState(false)
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
    <div>
      <img id="logo" src="" alt="logo" />
        <img id="logo" src="/images/eBike_logo.png" alt="logo" />
        <ul class="navbar-items">
            <li class="navbar-item"><a class="navbar-link" href="/products">Products</a></li>
            <li class="navbar-item"><a class="navbar-link" href="/about">About</a></li>
            <li class="navbar-item"><a class="navbar-link" href="/contact">Contact</a></li>
        </ul>
        {props.isAuthenticated ? <img src={LocalMallIcon} alt="cart" /> : <div>Login/Register</div>}
    </div>
  );
}

export default Navbar;
