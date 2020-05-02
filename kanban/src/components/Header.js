import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import avatar from "./avataruser.png";
import "../styles/prod/main.min.css";
const handleClickMenu = (menuActive, setMenu) => {
  setMenu(menuActive);
};
const Header = ({ username }) => {
  const { menuActive, setMenu } = useContext(GlobalContext);
  return (
    <div className={"header-bar"}>
      <div className={"header-bar__menu"}>
        <FontAwesomeIcon
          onClick={() => handleClickMenu(menuActive, setMenu)}
          icon={faBars}
          className={`header-bar__hamburger-menu ${
            menuActive
              ? "header-bar__hamburger-menu--unactive"
              : "header-bar__hamburger-menu--active"
          }`}
        />
        <FontAwesomeIcon
          onClick={() => handleClickMenu(menuActive, setMenu)}
          icon={faTimes}
          className={`header-bar__hamburger-menu ${
            menuActive
              ? "header-bar__hamburger-menu--active"
              : "header-bar__hamburger-menu--unactive"
          }`}
        />
        <div
          className={`header-bar__elements-container ${
            menuActive
              ? "header-bar__elements-container--active"
              : "header-bar__elements-container--unactive"
          }`}
        >
          <div className={`header-bar__menu-element`}>Projekty</div>
          <div className={`header-bar__menu-element`}>Widoki</div>
        </div>
      </div>
      <div className={"header-bar__username"}>
        Witaj, {username}
        <div className={"header-bar__useravatar"}>
          <img src={avatar} alt="User avatar" />
        </div>
      </div>
    </div>
  );
};
export default Header;
