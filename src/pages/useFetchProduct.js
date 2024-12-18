import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase"; // Import your Firestore database instance

export function useFetchProduct() {
  return useQuery(["products"], async () => {
    const querySnapshot = await getDocs(collection(db, "demoproducts"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
}
