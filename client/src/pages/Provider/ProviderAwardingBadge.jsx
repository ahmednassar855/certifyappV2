import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/BadgeAwarding";
import awardingBadgeList from "../../utils/awardingBadgeList";
import { Link, NavLink, Outlet } from "react-router-dom";

const ProviderAwardingBadge = () => {
  const [activeLink, setActiveLink] = useState(false);
  const links = awardingBadgeList;

  const toggleLink = () => {
    setActiveLink(!activeLink);
  };
  return (
    <Wrapper>
      <h3>Award New Padge</h3>
      <nav className="navList">
        <ul className="nav-links">
          {links?.map((links) => {
            const { text, path, mainPath } = links;
            return (
              <NavLink
                to={path} 
                key={text}
                className={`nav-link  ${activeLink ? "active" : "" }`}
                onClick={toggleLink}
                end
              >
                <span>{text}</span>
              </NavLink>
            );
          })}
        </ul>
      </nav>

      <div className="content">
        <Outlet/>
      </div>
    </Wrapper>
  );
};

export default ProviderAwardingBadge;
