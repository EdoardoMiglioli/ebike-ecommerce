import React from "react";
import GitHubButton from "./GitHubButton";
import GoogleButton from "./GoogleButton";

function ExternalLoginButtons(props) {
    return (
        <div className="external-login-buttons-container">
            <GitHubButton onClick={props.onClickGitHub} />
            <GoogleButton onClick={props.onClickGoogle} />
        </div>
    );
}

export default ExternalLoginButtons;
