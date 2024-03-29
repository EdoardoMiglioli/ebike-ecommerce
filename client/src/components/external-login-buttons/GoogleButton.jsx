import GoogleIcon from '@mui/icons-material/Google';
import React from "react";

function GoogleButton(props) {
    return (
        <div className="external-login-button google" onClick={props.onClick} >
            <GoogleIcon alt="Google logo" className="login-icon" />
            Google
        </div>
    );
}

export default GoogleButton;
