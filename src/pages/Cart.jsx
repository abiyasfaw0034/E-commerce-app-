import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { usePutOrder } from "../services/usePutOrder";
import { useUser } from "../auth/useUser";

const buttonCSS =
  "bg-gray-200 px-4 py-2 hover:bg-gray-500 dark:bg-gray-900 rounded-lg";

const apikey = "AIzaSyDUSWXmMcaW09ReLVs48ijcldrVqjQW6zs";
function Cart() {
  const [isConfirming, setIsConfirming] = useState(false);

  const { user } = useUser();

  const [userDetails, setUserDetails] = useState({
    id: user?.id || "", //it shouldnt be "" right?
    name: "",
    phone: "",
    address: "",
  });
  const [addressLoading, setAddressLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    cart,
    removeFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();
  const { order, isLoading } = usePutOrder();
  const navigate = useNavigate();

  const totalCost = cart.items.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );
  const tax = totalCost * 0.15;

  const handleOrderNow = () => {
    setIsConfirming(true); // Move to the confirmation page
  };

  const handlePlaceOrder = () => {
    if (!userDetails.name || !userDetails.phone || !userDetails.address) {
      setError("Please fill out all the fields.");
      return;
    }

    const orderData = {
      items: cart.items,
      totalCost,
      tax,
      grandTotal: totalCost + tax,
      user: userDetails,
    };

    order(orderData, {
      onSuccess: () => {
        clearCart();
        navigate("/product");
      },
    });
  };

  const getAddress = async () => {
    setAddressLoading(true);
    setError(""); // Reset any previous error
    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by this browser.");
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Use a geocoding API to fetch address
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apikey}`
          );
          const data = await response.json();
          const address = data.results[0]?.formatted_address;

          if (!address) throw new Error("Unable to fetch address.");

          setUserDetails((prev) => ({ ...prev, address }));
          setAddressLoading(false);
        },
        () => {
          throw new Error("Unable to fetch location.");
        }
      );
    } catch (error) {
      setError(error.message);
      setAddressLoading(false);
    }
  };

  if (isConfirming) {
    return (
      <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Confirm Your Order
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700"
          />
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={userDetails.phone}
            onChange={(e) =>
              setUserDetails({ ...userDetails, phone: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700"
          />
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Your address"
              value={userDetails.address}
              onChange={(e) =>
                setUserDetails({ ...userDetails, address: e.target.value })
              }
              className="flex-1 p-2 border border-gray-300 rounded-lg dark:bg-gray-700"
            />
            <button
              onClick={getAddress}
              className={buttonCSS}
              disabled={addressLoading}
            >
              {addressLoading ? "Fetching..." : "Get Address"}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-end align-middle gap-5">
            <button
              onClick={handlePlaceOrder}
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg ${
                isLoading && "opacity-50 cursor-not-allowed"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
            <button
              onClick={() => setIsConfirming(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="flex justify-between align-middle mb-6">
        <h2 className="text-2xl font-bold  text-gray-800 dark:text-gray-200">
          Your Shopping Cart
        </h2>

        <button
          className=" px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
          onClick={() => navigate(-1)}
        >
          Back to products
        </button>
      </div>

      {cart.items.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {item.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Qty: {item.quantity}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Price: ${Number(item.price)?.toFixed(2) || "0.00"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={buttonCSS}
                  onClick={() => incrementQuantity(item)}
                >
                  +
                </button>
                <button
                  className={buttonCSS}
                  onClick={() => decrementQuantity(item)}
                >
                  -
                </button>
                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 dark:text-gray-200 font-semibold">
              Subtotal: ${totalCost.toFixed(2)}
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-semibold">
              Tax: ${tax.toFixed(2)}
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-bold">
              Total: ${(totalCost + tax).toFixed(2)}
            </p>
          </div>

          <div className="flex justify-end align-middle gap-5">
            <button
              onClick={handleOrderNow}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Confirm Order
            </button>
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
