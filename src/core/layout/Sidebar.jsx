import { NavLink } from "react-router-dom";

export default function Sidebar({ links, title = "Menu" }) {
  return (
    <aside className="card h-fit flex flex-col bg-white border-r border-gray-100 shadow-sm sticky top-24">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h2>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "rounded-xl bg-orange-50 px-4 py-3 text-sm font-bold text-orange-700 transition-colors shadow-sm border border-orange-100 flex items-center justify-between"
                : "rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-between"
            }
          >
            {item.label}
            <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
