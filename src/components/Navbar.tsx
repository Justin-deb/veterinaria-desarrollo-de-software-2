import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ClientContext } from "../context/ClientContext";
import { FaPaw } from "react-icons/fa";

const Navbar = () => {
  const clientContext = useContext(ClientContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clientContext.setClientID("-1");
    localStorage.removeItem("clientID");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-linear-to-tr from-purple-600 to-pink-500 text-white shadow-sm">
            <FaPaw className="w-4 h-4" />
          </div>
          <span className="ml-1 font-semibold text-white">Veterinary</span>
        </NavLink>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className="no-underline">
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-1">
                <span className={`text-sm ${isActive ? "text-purple-400 font-semibold" : "text-gray-300 hover:text-white"}`}>Home</span>
                <span className={`h-1 w-6 rounded-full transition-all ${isActive ? "bg-purple-500" : "bg-transparent"}`} />
              </div>
            )}
          </NavLink>

          <NavLink to="/pets" className="no-underline">
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-1">
                <span className={`text-sm ${isActive ? "text-purple-400 font-semibold" : "text-gray-300 hover:text-white"}`}>Pets</span>
                <span className={`h-1 w-6 rounded-full transition-all ${isActive ? "bg-purple-500" : "bg-transparent"}`} />
              </div>
            )}
          </NavLink>

          <NavLink to="/clientDetails" className="no-underline">
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-1">
                <span className={`text-sm ${isActive ? "text-purple-400 font-semibold" : "text-gray-300 hover:text-white"}`}>Profile</span>
                <span className={`h-1 w-6 rounded-full transition-all ${isActive ? "bg-purple-500" : "bg-transparent"}`} />
              </div>
            )}
          </NavLink>
        </nav>

        {/* Actions: avatar / login */}
        <div className="flex items-center gap-4">
          <NavLink to="/clientDetails" title="Mi cuenta" className="w-9 h-9 rounded-full bg-linear-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-sm font-medium ring-1 ring-neutral-800 cursor-pointer text-center">
            U
          </NavLink>

          <button onClick={handleLogout} className="hidden sm:inline-flex ml-2 items-center gap-2 bg-neutral-800 text-sm text-gray-200 px-3 py-1.5 rounded hover:bg-neutral-700">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
