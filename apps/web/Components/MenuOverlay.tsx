import React from "react";
import NavLink from "./NavLink";
import { navItem } from "../TypeScript-Types/types";

interface Links {
    links : Array<navItem>
}

const MenuOverlay = ({ links } : Links ) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;