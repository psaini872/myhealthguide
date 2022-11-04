import React from "react";
import { Link } from "react-router-dom";
import SectionCSS from "./featurebar.module.css";

const Feature = () => {
  return (
    <div className={SectionCSS.flexcontainer}>
      <div className={SectionCSS.flexitem}>
        <Link to="/">Home</Link>
      </div>
      <div className={SectionCSS.flexitem}>
        <Link to="/">Food</Link>
      </div>
      <div className={SectionCSS.flexitem}>
        <Link to="/report">Report</Link>
      </div>
      <div className={SectionCSS.flexitem}>
        <Link to="/recipe">Recipe</Link>
      </div>
      <div className={SectionCSS.flexitem}>
        <a href="/">Exercise</a>
      </div>
    </div>
  );
};

export default Feature;
