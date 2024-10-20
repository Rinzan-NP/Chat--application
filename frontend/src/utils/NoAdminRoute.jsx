import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PublicRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        if (localStorage.getItem('access')){

          const decoded = jwtDecode(localStorage.getItem('access'));
          setIsAdmin(decoded.is_superuser);
        }
        else{
          setIsAdmin(false);
        }

        
        setLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    // Handle loading state, you might show a loading spinner
    return <div>Loading...</div>;
  }

  if (! isAdmin) {
    // If not authenticated, redirect to login page with the return URL
    return children;
  }

  // If authenticated, render the child components
  return <Navigate to="/admin/" />;
}

export default PublicRoute;