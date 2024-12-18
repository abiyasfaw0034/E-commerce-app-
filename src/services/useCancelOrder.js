/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelOrder } from "./apiOrder";

export function useCancelOrder() {
  const queryClient = useQueryClient();

  const { mutate: cancelOrderMutate, isLoading } = useMutation({
    mutationFn: (orderId) => cancelOrder(orderId), // Pass the orderId to the cancelOrder function
    onSuccess: (data) => {
      toast.success(`Order  canceled successfully.`);
      queryClient.invalidateQueries(["orders"]); // Refetch the orders after cancellation
    },
    onError: (error) => {
      toast.error(`Failed to cancel the order: ${error.message}`);
    },
  });

  return { cancelOrderMutate, isLoading };
}
