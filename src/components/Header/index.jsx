import React from "react";
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className="flex justify-between px-10 py-4 bg-teal-400 text-blue-900 font-medium">
      <div>Logo</div>
      <ul className="flex gap-10">
      <li><Link to='/'>Home</Link></li>
        <li><a href="">About</a></li>
        <li><Link to ="/blogs">Blogs</Link></li>
        <li><a href="">Services</a></li>
        <li><a href="">Contact</a></li>
        <li><Link to="/create-blog">Create Blog</Link></li>

      </ul>
    </div>
  );
};

export default Header;
