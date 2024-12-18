/* eslint-disable no-unused-vars */
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useState } from "react";
import Modal from "./Modal"; // Assuming you have Modal component
import UserToggle from "./UserToggle";
// import UserToggle from "./UserToggle"; // Assuming you have UserToggle component
// import SideBar from "./SideBar"; // Assuming you have SideBar component

export default function NavBar() {
  const { cart = {} } = useCart();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="dark:bg-black w-full h-[13vh] flex justify-between items-center px-10 shadow-md">
      <div className="text-3xl font-bold">
        <NavLink to="/product" className="text-black dark:text-white">
          Mamuye Shop
        </NavLink>
      </div>

      <ul className="flex items-center gap-8 text-lg">
        <li className="hidden md:block">
          <SearchForm />
        </li>
        <li className="hidden md:block">
          <NavLink
            to="/orders"
            className="text-black dark:text-white hover:underline"
          >
            Orders
          </NavLink>
        </li>
        <li className="hidden md:block">
          <NavLink
            to="/about"
            className="text-black dark:text-white hover:underline"
          >
            About Us
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/cart"
            className="flex items-center gap-2 text-black dark:text-white"
          >
            <HiOutlineShoppingCart className="w-6 h-6" />
            <span>{cart?.items?.length || 0}</span>
            <span>Cart</span>
          </NavLink>
        </li>

        <li className="hidden md:block">
          <Modal>
            <UserToggle />

            {/* <div>helo</div> */}
          </Modal>
        </li>

        <li className="md:hidden">
          {isOpen ? (
            <IoMenu
              className="w-8 h-8 text-black dark:text-white"
              onClick={toggleSidebar}
            />
          ) : (
            // <SideBar setIsOpen={toggleSidebar} isOpen={isOpen} />
            <div>helo</div>
          )}
        </li>
      </ul>
    </nav>
  );
}

function SearchForm() {
  const [productName, setProductName] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProductName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName) return;
    navigate(`/product/${productName}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Search products..."
        value={productName}
        onChange={handleChange}
        className="p-2 rounded border focus:outline-none"
        required
      />
      <button
        type="submit"
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
      >
        Search
      </button>
    </form>
  );
}
