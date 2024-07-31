import { createContext, useContext, useEffect, useState } from "react";
import * as cartService from "../services/cartService";
const userContext = createContext();

export function UserProvider({ children }) {
  const [cart, setCart] = useState({
    cartDetails: [],
    sum: 0,
  });

  useEffect(() => {
    const fetchCart = async () => {
      const data = await cartService.getCart();
      console.log("fetch trong context")
      setCart(() => data.data);
    };
    fetchCart();
  },[]);
  return (
    <userContext.Provider value={{ cart, setCart }}>
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  return useContext(userContext);
}
