/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from "react";
import { useCart } from "../context/cartContext";
import { useFetchProduct } from "./useFetchProduct";
import { useNavigate } from "react-router-dom";
import { HiCheck } from "react-icons/hi2";
import Loader from "../ui/Loader";

// Product Component
function Product() {
  const { data: products = [], isLoading: isFetchingProducts } =
    useFetchProduct();

  if (isFetchingProducts)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader />
      </div>
    );

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div>
      <div className="h-[70px]">Some kind of ad</div>
      <div className="p-5 bg-gray-400 space-y-8">
        {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
          <CategorySection
            key={category}
            category={category}
            products={categoryProducts}
          />
        ))}
      </div>
    </div>
  );
}

export default Product;

// Category Section Component
function CategorySection({ category, products }) {
  return (
    <div className="mb-10">
      {/* Category Header */}
      <h2 className="text-2xl font-bold mb-4 p-4 bg-white rounded-lg shadow-sm">
        {category}
      </h2>
      {/* Products Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7">
        {products.map((product) => (
          <ProductItems item={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

// Optimized ProductItems Component
export const ProductItems = React.memo(({ item }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { addToCart, removeFromCart, cart } = useCart();

  // UseMemo for checking if item is in the cart
  const isInCart = useMemo(
    () => cart.items.some((cartItem) => cartItem.id === item.id),
    [cart.items, item.id]
  );

  useEffect(() => {
    setIsAdded(isInCart);
  }, [isInCart]);

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(item);
  };

  const handleCancel = () => {
    setIsAdded(false);
    removeFromCart(item);
  };

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${item.name}`)}
      className="bg-white shadow-lg rounded-lg p-5 overflow-hidden transform will-change-transform transition duration-300 hover:scale-105 flex flex-col"
    >
      {/* Image */}
      <img
        src={item.imageUrl || "https://via.placeholder.com/150"}
        alt={item.name}
        loading="lazy"
        className="w-full h-40 object-cover mb-4 rounded-t-lg"
      />

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
        <p className="text-gray-500 mb-4 text-xl">Price: ${item.price}</p>
      </div>

      {/* Button */}
      <div
        className="mt-auto"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {isAdded ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
            className={`w-full bg-blue-500 text-white px-4 py-2 rounded transition duration-300 text-center flex justify-center items-center ${
              hovered ? "bg-red-500 hover:bg-red-600" : "hover:bg-blue-600"
            }`}
          >
            {hovered ? (
              <div>Cancel order</div>
            ) : (
              <HiCheck className="text-3xl" />
            )}
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
});
