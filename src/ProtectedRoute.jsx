import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ requiredRole }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        setIsAuthorized(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.api+json",
            },
          }
        );

        
        const user = response.data.user;
        if (user && user.status === requiredRole) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [requiredRole]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
