import { createContext,useState, useEffect, useContext } from "react";
import axios from "axios";

const userContext = createContext(null);

export function UserProvider({ children } : any) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  async function fetchUser() {
    try { 
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get("https://bunus-be-production.up.railway.app/v1/get-me");
      setUser(response.data);
      setToken(token);
    }
    } catch (error) {
      localStorage.removeItem("token");
        setUser(null);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}