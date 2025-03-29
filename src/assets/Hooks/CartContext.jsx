import React, { createContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const existingItem = state.find(item => item.id === action.product.id);
            if (existingItem) {
                return state.map(item =>
                    item.id === action.product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...state, { ...action.product, quantity: 1 }];
            }

        case "REMOVE_FROM_CART":
            return state.filter(item => item.id !== action.id);

        case "UPDATE_QUANTITY":
            return state.map(item =>
                item.id === action.id
                    ? { ...item, quantity: Math.max(action.quantity, 1) } // Garante que a quantidade mínima seja 1
                    : item
            );

        case "CLEAR_CART":
            return [];

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => React.useContext(CartContext);
