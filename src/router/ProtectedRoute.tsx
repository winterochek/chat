import { FC, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute: FC<any> = ({ children }) => {
   const { currentUser } = useContext(AuthContext);

   if (!currentUser) return <Navigate to='/login' />;
   return children;
};
