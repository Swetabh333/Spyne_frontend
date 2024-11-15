import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, Plus, LogOut, LogIn, UserPlus, Car } from "lucide-react";
import { useState,useContext } from "react";
import { Context } from "@/context/authContext";
import axios from "axios";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authorized } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get("/auth/logout");
    navigate("/login");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const NavLinks = () => (
    <>
      {authorized ? (
        <>
          <Link
            to="/cars"
            className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors duration-200"
            onClick={closeMenu}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link
            to="/cars/add"
            className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors duration-200"
            onClick={closeMenu}
          >
            <Plus size={20} />
            <span>Add Car</span>
          </Link>
          <button
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors duration-200"
            onClick={closeMenu}
          >
            <LogIn size={20} />
            <span>Login</span>
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors duration-200"
            onClick={closeMenu}
          >
            <UserPlus size={20} />
            <span>Register</span>
          </Link>
        </>
      )}
    </>
  );

 
  return (
    <nav className="bg-blue-500 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to={authorized ? "/cars" : "/"} 
            className="flex items-center space-x-3 text-xl font-bold text-white hover:text-blue-100 transition-colors duration-200"
          >
            <Car size={24} />
            <span>CarGo</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-4 bg-blue-500 border-t border-blue-400">
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;