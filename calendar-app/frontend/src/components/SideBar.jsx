import { useState } from "react";
import '../styles/Sidebar.css';

const navItems = [
  { icon: "calendar_month", label: "Kalenteri", key: "calendar" },
  { icon: "list_alt", label: "Tapahtumalista", key: "list" },
];

const Icon = ({ icon }) => (
  <span className="material-symbols-outlined">{icon}</span>
);

const Button = ({ item, onNavChange }) => (
  <button type="button" onClick={() => onNavChange(item.key)}>
    <Icon icon={item.icon} />
    <p>{item.label}</p>
  </button>
);

export default function Sidebar({ onNavChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="page sidebar-7-page">
      <button
        type="button"
        className="sidebar-7-burger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon icon={isOpen ? "menu_open" : "menu"} />
      </button>

      <aside className={`sidebar-7 ${isOpen ? "open" : ""}`}>
        <div className="inner">
          <nav>
            {navItems.map((item) => (
              <Button key={item.key} item={item} onNavChange={onNavChange} />
            ))}
          </nav>
        </div>
      </aside>
    </section>
  );
}