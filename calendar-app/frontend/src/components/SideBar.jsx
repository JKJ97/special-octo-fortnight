import { useState } from "react";
import '../styles/Sidebar.css';

// Navigation items shown in the sidebar
const navItems = [
  { icon: "calendar_month", label: "Kalenteri", key: "calendar" },
  { icon: "list_alt", label: "Tapahtumalista", key: "list" },
];

// Renders a Material Icons icon by name
const Icon = ({ icon }) => (
  <span className="material-symbols-outlined">{icon}</span>
);

// Individual navigation button component
// Calls onNavChange with the selected view key when clicked
const Button = ({ item, onNavChange }) => (
  <button type="button" onClick={() => onNavChange(item.key)}>
    <Icon icon={item.icon} />
    <p>{item.label}</p>
  </button>
);

// Sidebar component with collapsible menu
export default function Sidebar({ onNavChange }) {
  const [isOpen, setIsOpen] = useState(false); // Controls sidebar visibility

  return (
    <section className="page sidebar-7-page">
      {/* Hamburger menu button to toggle sidebar open/close */}
      <button
        type="button"
        className="sidebar-7-burger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon icon={isOpen ? "menu_open" : "menu"} />
      </button>

      {/* Sidebar container, toggled open/closed */} 
      <aside className={`sidebar-7 ${isOpen ? "open" : ""}`}>
        <div className="inner">
          <nav>
            {/* Render all navigation items */}
            {navItems.map((item) => (
              <Button key={item.key} item={item} onNavChange={onNavChange} />
            ))}
          </nav>
        </div>
      </aside>
    </section>
  );
}