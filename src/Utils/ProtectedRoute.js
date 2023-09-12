import { Navigate } from 'react-router-dom';
import { useUser } from 'Contexts/UserContext';

function ProtectedRoute({ children, allowedUserTypes = [] }) {
    const { user } = useUser();
  
    if (!user) {
      return <Navigate to="/home" />;
    }
  
    if (!allowedUserTypes.includes(user.type)) {
      return <Navigate to="/404" />;
    }
  
    return children;
  }
  
  export default ProtectedRoute;
  