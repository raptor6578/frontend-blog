import React from "react"
import "./Search.css"

const Search: React.FC = () => (
  <div className="search">
    <input type="text" placeholder="Chercher un article" /><a href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
  </div>
)

export default Search