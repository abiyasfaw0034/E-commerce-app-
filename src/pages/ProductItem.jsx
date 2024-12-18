/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import { useFetchProduct } from "./useFetchProduct";
import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { HiCheck } from "react-icons/hi";

function ProductItem() {
  const [isAdded, setIsAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { addToCart, removeFromCart, cart } = useCart();

  const { productname } = useParams();
  const navigate = useNavigate();

  const { data: products = [], isLoading: isFetchingProducts } =
    useFetchProduct();

  // Find the product based on the name from URL parameters
  const product = products.find(
    (item) =>
      item.name && item.name.toLowerCase().includes(productname.toLowerCase())
  );

  useEffect(() => {
    // Check if the item is already in the cart when the component mounts
    const isInCart = cart.items.some((cartItem) => cartItem.id === product?.id);
    setIsAdded(isInCart);
  }, [cart.items, product?.id]);
  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(product);
  };

  const handleCancel = () => {
    setIsAdded(false);
    removeFromCart(product);
  };

  if (isFetchingProducts) return <div>Loading...</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="p-5 max-w-5xl mx-auto relative">
      {/* Back Button at the Top Right */}
      <button
        className="absolute top-5 right-5 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      {/* Main Layout */}
      <div className="flex gap-10 ">
        {/* Product Image */}
        <div className="w-1/2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[28rem] object-cover rounded-md shadow-md"
          />
        </div>

        {/* Product Details and Actions */}
        <div className="w-1/2 flex flex-col justify-between">
          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.description}</p>
            <div className="text-lg font-medium text-gray-700 space-y-2">
              <p>
                Price: <span className="text-green-600">${product.price}</span>
              </p>
              <p>
                Category:{" "}
                <span className="text-blue-600 capitalize">
                  {product.category}
                </span>
              </p>
              <p>
                Available Quantity:{" "}
                <span className="text-purple-600">{product.quantity}</span>
              </p>
            </div>
          </div>

          {/* Add to Cart Button */}
          {/* <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">
            Add to Cart
          </button> */}
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
                className={`w-full bg-blue-500 text-white  px-4 py-2 rounded transition duration-300 text-center flex justify-center items-center ${
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
      </div>
    </div>
  );
}

export default ProductItem;
