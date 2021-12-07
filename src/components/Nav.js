import React from "react";
import { Link } from "react-router-dom";
import { GiShardSword, GiCapeArmor } from "react-icons/gi";
import { SiAboutdotme } from "react-icons/si";
import { AiOutlineShop } from "react-icons/ai";

function Nav() {
  return (
    <div className='fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 text-white shadow-lg'>
      <Link to='/adventure'>
        <NavIcon icon={<GiShardSword />} text='Adventure' />
      </Link>
      <Link to='/character'>
        <NavIcon icon={<GiCapeArmor />} text='Character' />
      </Link>
      <Link to='/shop'>
        <NavIcon icon={<AiOutlineShop />} text='Shop' />
      </Link>
      <Link to='/about'>
        <NavIcon icon={<SiAboutdotme />} text='About Me' />
      </Link>
    </div>
  );
}

const NavIcon = ({ icon, text = "tooltip" }) => (
  <div className='navbar-icon group'>
    {icon}
    <span className='navbar-tooltip group-hover:scale-100'>{text}</span>
  </div>
);

export default Nav;
