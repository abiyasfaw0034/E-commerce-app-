/* eslint-disable no-unused-vars */
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { cart = {} } = useCart();
  return (
    <div className="bg-gray-200  h-[13dvh] ">
      <div className="flex justify-between p-5">
        <div className="text-5xl font-black">
          <NavLink to="/product">Mamuye Shop</NavLink>
        </div>
        <div className="flex justify-center items-center gap-5 text-xl">
          <Form />
          <NavLink to="/product">
            <div className="flex gap-5 justify-center items-center">
              <div>Product</div>
            </div>
          </NavLink>
          <NavLink to="/cart">
            <div className="flex gap-5 justify-center items-center">
              <HiOutlineShoppingCart />
              {cart?.items?.length}
              <div>Cart</div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

function Form() {
  const [productName, setProductName] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setProductName(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!productName) return;
    navigate(`/product/${productName}`);
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex gap-5">
        <input
          type="text"
          placeholder="Product name"
          value={productName} // Bind the input value to state
          onChange={handleChange} // Update state on input change
          className="focus:outline-none p-3 rounded"
          required
        />
        <button
          type="submit"
          className="bg-gray-500 text-white px-5 rounded hover:bg-gray-600 transition duration-300"
        >
          Search
        </button>
      </form>
    </div>
  );
}
