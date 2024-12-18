/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const initialState = {
  items: [],
};

// Create a context
const CartContext = createContext();

// Cart reducer to handle adding/removing items and updating quantity
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemExists = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemExists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    case "INCREMENT_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREMENT_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0), // Remove the item if quantity is 0
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => dispatch({ type: "ADD_TO_CART", payload: item });
  const removeFromCart = (item) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // New actions for incrementing and decrementing quantity
  const incrementQuantity = (item) =>
    dispatch({ type: "INCREMENT_QUANTITY", payload: item });
  const decrementQuantity = (item) =>
    dispatch({ type: "DECREMENT_QUANTITY", payload: item });

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  return useContext(CartContext);
};
