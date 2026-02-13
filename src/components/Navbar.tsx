import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ClientContext } from "../context/ClientContext";
import { FaPaw } from "react-icons/fa";

const Navbar = () => {
  const { clientID, setClientID } = useContext(ClientContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setClientID("-1");
    localStorage.removeItem("clientID");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-sm">
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
                <span className={`text-sm ${isActive ? "text-purple-400 font-semibold" : "text-gray-300 hover:text-white"}`}>Mascotas</span>
                <span className={`h-1 w-6 rounded-full transition-all ${isActive ? "bg-purple-500" : "bg-transparent"}`} />
              </div>
            )}
          </NavLink>

          <NavLink to="/clientDetails" className="no-underline">
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-1">
                <span className={`text-sm ${isActive ? "text-purple-400 font-semibold" : "text-gray-300 hover:text-white"}`}>Clientes</span>
                <span className={`h-1 w-6 rounded-full transition-all ${isActive ? "bg-purple-500" : "bg-transparent"}`} />
              </div>
            )}
          </NavLink>
        </nav>

        {/* Actions: avatar / login */}
        <div className="flex items-center gap-4">
          {clientID && clientID !== "-1" ? (
            <>
              <NavLink to="/clientDetails" title="Mi cuenta" className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-sm font-medium ring-1 ring-neutral-800 cursor-pointer text-center">
                U
              </NavLink>

              <button onClick={handleLogout} className="hidden sm:inline-flex ml-2 items-center gap-2 bg-neutral-800 text-sm text-gray-200 px-3 py-1.5 rounded hover:bg-neutral-700">
                Cerrar sesión
              </button>
            </>
          ) : (
            <NavLink to="/login" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1.5 rounded">
              Iniciar sesión
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
