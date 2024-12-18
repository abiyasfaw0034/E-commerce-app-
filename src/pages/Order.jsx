/* eslint-disable react/prop-types */
import { useUser } from "../auth/useUser";
import { useGetOrder } from "./useGetOrder";
import Loader from "../ui/Loader";
import { useCancelOrder } from "../services/useCancelOrder";
// import { useCancelOrder } from "../services/useCancelOrder";

function Order() {
  const { user } = useUser();
  const { data: orders, isLoading, error } = useGetOrder(user?.id);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  if (!orders || orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <OrderItem order={order} key={order.id} />
        ))}
      </ul>
    </div>
  );
}

export default Order;

function OrderItem({ order }) {
  const { cancelOrderMutate, isLoading } = useCancelOrder();

  const handleCancelOrder = () => {
    cancelOrderMutate(order.id); // Directly use the mutation
  };

  return (
    <li className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-lg flex justify-between">
      {/* Left side: Order details */}
      <div className="flex-1 pr-6 space-y-3">
        <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
        <p className="text-sm">Shipping Address: {order.user.address}</p>
        <div className="text-sm space-y-1">
          <h4 className="font-medium">Items:</h4>
          {order.items.slice(0, 3).map((item, idx) => (
            <p key={idx} className="text-gray-600 dark:text-gray-400">
              {item.name} x{item.quantity}
            </p>
          ))}
          {order.items.length > 3 && (
            <p className="text-gray-600 dark:text-gray-400">
              +{order.items.length - 3} more items
            </p>
          )}
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex flex-col items-end text-sm space-y-3">
        <p className="font-medium">Total: ${order.grandTotal.toFixed(2)}</p>
        <p className="text-gray-600 dark:text-gray-400">
          Tax: ${order.tax.toFixed(2)}
        </p>
        <button
          onClick={handleCancelOrder}
          disabled={isLoading}
          className={`mt-3 px-5 py-2 rounded-lg text-white transition ${
            isLoading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isLoading ? "Cancelling..." : "Cancel Order"}
        </button>
      </div>
    </li>
  );
}
