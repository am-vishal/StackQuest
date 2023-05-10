import axios from "axios";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by looking for access token in local storage or cookie
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // Verify access token with server to ensure it's valid
      axios
        .get("/api/auth/verifyAccessToken", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then(() => setIsLoggedIn(true))
        .catch(() => {
          localStorage.removeItem("accessToken");
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn;
};

export default useAuth;
