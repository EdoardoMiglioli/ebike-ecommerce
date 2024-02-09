import React, { useState } from "react";

function BurgerMenuIcon({ onClick }) {

    return (
        <button className="burger-menu" onClick={onClick}>Menu</button>
    );
}

export default BurgerMenuIcon;
