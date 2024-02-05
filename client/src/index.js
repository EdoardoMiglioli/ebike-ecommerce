import React from "react";
import { createRoot } from "react-dom/client";
import Navbar from "./components/partials/navbar"

const navbarRoot = createRoot(document.getElementById("navbar"));
navbarRoot.render(<Navbar />);

