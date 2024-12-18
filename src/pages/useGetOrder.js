import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../services/apiOrder";

export function useGetOrder(userId) {
  return useQuery(["orders", userId], () => getOrder(userId), {
    enabled: !!userId, // Fetch orders only when userId is available
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
}
