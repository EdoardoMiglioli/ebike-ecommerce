import GitHubIcon from '@mui/icons-material/GitHub';
import React from "react";

function GitHubButton(props) {
    return (
        <div className="external-login-button github" onClick={props.onClick} >
            <GitHubIcon alt="GitHub logo" className="login-icon" />
            GitHub
        </div>
    );
}

export default GitHubButton;