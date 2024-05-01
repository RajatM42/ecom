import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { AiOutlineHome, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import '../Auth/Navigation.css'

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-white py-6 px-8 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-gray-800 text-3xl font-bold logo">
        Your Brand
      </Link>

      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-800 flex items-center">
            <AiOutlineHome className="text-2xl" />
            <span className="ml-2">Home</span>
          </Link>
          <Link to="/shop" className="text-gray-800 flex items-center">
            <AiOutlineShopping className="text-2xl" />
            <span className="ml-2">Shop</span>
          </Link>
          <Link to="/cart" className="text-gray-800 flex items-center relative">
            <AiOutlineShoppingCart className="text-2xl" />
            <span className="ml-2">Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-4 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{cartItems.length}</span>
            )}
          </Link>
          <Link to="/favorite" className="text-gray-800 flex items-center relative">
            <FaHeart className="text-2xl" />
            <span className="ml-2">Favorites</span>
            {favoriteCount > 0 && (
              <span className="absolute -top-4 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{favoriteCount}</span>
            )}
          </Link>
        </div>

        {userInfo ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="text-gray-800 flex items-center">
              <span>{userInfo.username}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ml-2 ${dropdownOpen ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-3 bg-white text-gray-800 rounded-md shadow-md py-2 z-20">
                <li><Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link></li>
                {userInfo.isAdmin && (
                  <>
                    <li><Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-200">Dashboard</Link></li>
                    <li><Link to="/admin/productlist" className="block px-4 py-2 hover:bg-gray-200">Products</Link></li>
                    <li><Link to="/admin/categorylist" className="block px-4 py-2 hover:bg-gray-200">Category</Link></li>
                    <li><Link to="/admin/orderlist" className="block px-4 py-2 hover:bg-gray-200">Orders</Link></li>
                    <li><Link to="/admin/userlist" className="block px-4 py-2 hover:bg-gray-200">Users</Link></li>
                  </>
                )}
                <li><button onClick={logoutHandler} className="block w-full px-4 py-2 text-left hover:bg-gray-200">Logout</button></li>
              </ul>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-800 flex items-center">
              <AiOutlineLogin className="text-2xl" />
              <span className="ml-2">Login</span>
            </Link>
            <Link to="/register" className="text-gray-800 flex items-center">
              <AiOutlineUserAdd className="text-2xl" />
              <span className="ml-2">Register</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
