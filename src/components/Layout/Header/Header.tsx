import React from "react"
import Search from "./Search/Search"
import Social from "./Social/Social"
import styles from "./Header.module.css"

const Header: React.FC = () => (
  <div className={styles.header}>
    <header>
      <div className={styles.logo}><h1><span>💫 Nicolas Damm</span></h1></div>
        <div className={styles.headerRight}>
          <Social />
          <Search />
      </div>
    </header>
  </div>
);

export default Header