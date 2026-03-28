
import React from 'react';

const Sidebar = ({ items }) => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {items && items.map((item) => (
            <li key={item.id}>
              <a href={item.path}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
