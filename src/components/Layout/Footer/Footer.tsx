import React from "react"
import styles from "./Footer.module.css"

const Footer: React.FC = () => (
  <div className={styles.footer}>
    <footer>
      <p>©2025 Damm Nicolas</p>
      <p>
        <i className="fa-brands fa-html5 fa-lg"></i> 
        <i className="fa-brands fa-css3-alt fa-lg"></i>
        <i className="fa-brands fa-node fa-lg"></i> 
        <i className="fa-brands fa-react fa-lg"></i> 
      </p>
    </footer>
  </div>
)

export default Footer