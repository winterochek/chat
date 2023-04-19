import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage } from '../pages';
import { ProtectedRoute } from './ProtectedRoute';

export const Router: FC = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/'>
               <Route
                  index
                  element={
                     <ProtectedRoute>
                        <HomePage />
                     </ProtectedRoute>
                  }
               />
               <Route path='login' element={<LoginPage />} />
               <Route path='register' element={<RegisterPage />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
};
