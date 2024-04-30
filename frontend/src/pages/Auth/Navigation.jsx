import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { FaHome, FaShoppingCart, FaHeart } from "react-icons/fa";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <span className="text-gray-800 font-semibold flex items-center space-x-1">
                <FaHome className="text-xl" />
                <span>YourLogo</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-sm flex items-center space-x-1">
              <FaHome className="text-lg" />
              <span>Home</span>
            </Link>
            <Link to="/shop" className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-sm flex items-center space-x-1">
              <FaShoppingCart className="text-lg" />
              <span>Shop</span>
            </Link>
            <Link to="/cart" className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-sm flex items-center space-x-1 relative">
              <FaShoppingCart className="text-lg" />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white rounded-full px-1">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/favorite" className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-sm flex items-center space-x-1">
              <FaHeart className="text-lg" />
              <span>Favorites</span>
              <FavoritesCount />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="ml-3 relative">
              <button
                onClick={toggleDropdown}
                className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm flex items-center space-x-1 focus:outline-none"
                id="user-menu"
                aria-haspopup="true"
              >
                <AiOutlineUser className="text-lg" />
                {userInfo && <span>{userInfo.username}</span>}
              </button>
              {dropdownOpen && userInfo && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {userInfo.isAdmin && (
                    <>
                      <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Dashboard</Link>
                      <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Products</Link>
                      <Link to="/admin/categorylist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Category</Link>
                      <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Orders</Link>
                      <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Users</Link>
                    </>
                  )}
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profile</Link>
                  <button onClick={logoutHandler} className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
