import React from "react"
import Search from "./Search/Search"
import "./Header.css"
import Social from "./Social/Social";

const Header: React.FC = () => (
  <div className="header">
    <header>
      <div className="logo"><h1><span>💫 Nicolas Damm</span></h1></div>
        <div className="header-right">
          <Social />
          <Search />
      </div>
    </header>
  </div>
);

export default Header