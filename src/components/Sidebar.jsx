import { NavLink } from "react-router-dom";

export default function Sidebar({ links }) {
  return (
    <aside className="card-surface p-4">
      <nav className="flex flex-col gap-2">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "rounded-lg bg-amber-700 px-3 py-2 text-sm font-semibold text-white"
                : "rounded-lg px-3 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
