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
        <li className="hidden md:block p-5">
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

        <li className="hidden md:block">
          <Modal>
            <UserToggle />

            {/* <div>helo</div> */}
          </Modal>
        </li>

        <li>
          <NavLink
            to="/cart"
            className="flex items-center gap-2 text-black dark:text-white"
          >
            <HiOutlineShoppingCart className="w-8 h-8" />
            {/* <span>{cart?.items?.length || 0}</span> */}
            <div className="relative inline-block">
              <div className="absolute -top-3 right-0 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart?.items?.length || 0}
              </div>
              <div className="text-lg font-semibold">Cart</div>
            </div>
          </NavLink>
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
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 border border-black rounded-3xl"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={productName}
        onChange={handleChange}
        className="p-2 pl-4 rounded-3xl  focus:outline-none"
        required
      />
      <button
        type="submit"
        className="  px-4 py-2 rounded-3xl hover:bg-gray-600 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
          />
        </svg>
      </button>
    </form>
  );
}
