import React, { createContext, useContext, useReducer } from 'react';

// Create contexts
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to handle cart actions
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img

        }
      ];
    case "UPDATE":
        return state.map(food => 
            food.id === action.id
              ? {
                  ...food,
                  qty: parseInt(action.qty) + food.qty,
                  price: parseFloat(action.price) + food.price
                }
              : food
          );
    case "REMOVE":
        let newArr=[...state]
        newArr.splice(action.index,1)
        return newArr;
    case "DROP":
        let empArray=[]
        return empArray;
    default:
      console.log("Error in Reducer");
      return state; // Always return the current state for unrecognized actions
  }
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

// Custom hooks to use the cart state and dispatch
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
