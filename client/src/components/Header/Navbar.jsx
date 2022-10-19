import React from "react";
import NavbarCSS from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={NavbarCSS.nav}>
      <h1 className={`${NavbarCSS.logo} ${NavbarCSS.flexitem}`}>
        MyNutritionGuide
      </h1>
      <p className={NavbarCSS.profile}>
        Hi,
        <a className={`${NavbarCSS.name} ${NavbarCSS.flexitemh}`} href="/">
          pranshu872
        </a>
      </p>
      <a href="/" className={`${NavbarCSS.blog} ${NavbarCSS.flexitemh}`}>
        Blog
      </a>
      <a href="/" className={`${NavbarCSS.logout} ${NavbarCSS.flexitemh}`}>
        Log Out
      </a>
    </div>
  );
};

export default Navbar;
