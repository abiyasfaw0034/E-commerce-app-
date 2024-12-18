import { db } from "./firebase"; // Path to your Firebase config file
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

export async function putOrder(orderData) {
  try {
    // Reference to the "orders" collection in Firestore
    const ordersCollection = collection(db, "demoorders");

    // Add a new document with the order data
    const docRef = await addDoc(ordersCollection, orderData);

    // Return the document ID for confirmation
    return { id: docRef.id, ...orderData };
  } catch (error) {
    console.error("Error submitting order:", error);
    throw new Error("Failed to submit the order");
  }
}

export async function getOrder(userId) {
  try {
    // Reference to the "orders" collection in Firestore
    const ordersCollection = collection(db, "demoorders");

    // Query orders where "user.id" matches the authenticated user's ID
    const q = query(ordersCollection, where("user.id", "==", userId));
    const querySnapshot = await getDocs(q);

    // Map through the results to format the orders
    const orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

export async function cancelOrder(orderId) {
  try {
    // Reference to the order document in Firestore by orderId
    const orderDocRef = doc(db, "demoorders", orderId);

    // Delete the order document
    await deleteDoc(orderDocRef);

    return { orderId }; // Return the orderId to show in the success message
  } catch (error) {
    console.error("Error canceling order:", error);
    throw new Error("Failed to cancel the order");
  }
}
