import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { putOrder } from "./apiOrder";
import { useUser } from "../auth/useUser";

export function usePutOrder() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const userId = user.id;

  const { mutate: order, isLoading } = useMutation({
    mutationFn: (data) => putOrder(data),
    onSuccess: () => {
      toast.success("Order submitted succesfully");
      queryClient.invalidateQueries(["orders", userId]);
    },
    onError: () => {
      toast.error("Order submitting failed");
    },
  });

  return { order, isLoading };
}
