import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { id, isKeepLogin } = useSelector((state) => {
    return {
      id: state.auth.id,
      isKeepLogin: state.auth.isKeepLogin,
    };
  });
  return id || isKeepLogin ? children : <Navigate to='/' replace />;
}
