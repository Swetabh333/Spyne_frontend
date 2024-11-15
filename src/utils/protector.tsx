// import { ReactNode,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from '../context/authContext';

// interface ProtectorProps {
//   children: ReactNode;
// }

// const Protector: React.FC<ProtectorProps> = ({ children }) => {
//   const navigate = useNavigate();
//   const { isAuthenticated, loading } = useAuth();

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       console.log(isAuthenticated)
//       navigate("/login");
//     }
//   }, [loading, isAuthenticated, navigate]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? <>{children}</> : null;
// };

// export default Protector;

import { useLocation } from "react-router-dom";
import { Context } from "../context/authContext";
import { ReactNode, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Protector:React.FC<{children:ReactNode}> = ({children})=>{
    const {authorized, setRedirected} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate()
    useEffect(()=>{
        if (!authorized){
            setRedirected(location.pathname);
            navigate('/')
        }
    }, [])
    return (<>{authorized && (<>{children}</>) }</>)
  }

  export default Protector;