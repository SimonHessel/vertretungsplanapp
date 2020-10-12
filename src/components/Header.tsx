import React from "react";
import { Link } from "react-router-dom";

import { HeaderConfig } from "../interfaces/HeaderConfig";

interface HeaderProps {
  title: string;
  left?: HeaderConfig;
  right?: HeaderConfig;
}

export const Header: React.FC<HeaderProps> = ({ title, left, right }) => {
  return (
    <header>
      {left && left.icon ? (
        left.link ? (
          <Link to={left.link}>{left.icon}</Link>
        ) : (
          <span>{left.icon}</span>
        )
      ) : (
        <div className="placeholderIcon" />
      )}

      <h1>{title}</h1>

      {right && right.icon ? (
        right.link ? (
          <Link to={right.link}>{right.icon} </Link>
        ) : (
          <span>{right.icon}</span>
        )
      ) : (
        <div className="placeholderIcon" />
      )}
    </header>
  );
};
