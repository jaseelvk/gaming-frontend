import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { initialState, reducer } from "./Reducer";

export const UserContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rehydrateUserData = async () => {
      const userData = JSON.parse(localStorage.getItem("user_data"));
      const authToken = localStorage.getItem("authToken");
      dispatch({ type: "LOGIN", payload: { ...userData, access: authToken } });
      setLoading(false);
    };

    rehydrateUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{ userData: state.userData, dispatch, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useStore = () => useContext(UserContext);
