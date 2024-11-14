import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

interface ProtectorProps {
  children: ReactNode;
}

const Protector: React.FC<ProtectorProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await axios.get("/verify");
        setIsAuthenticated(true);
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, [navigate]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{isAuthenticated ? children : null}</>;
};

export default Protector;
