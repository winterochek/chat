import { FC, createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { MyContext } from '../types';

export const AuthContext = createContext<MyContext>({
   currentUser: null
});

export const AuthContextProvider: FC<any> = ({ children }) => {
   const [currentUser, setCurrentUser] = useState<any | null>(null);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         setCurrentUser(user);
      });

      return () => {
         unsubscribe();
      };
   }, []);

   return (
      <AuthContext.Provider value={{ currentUser: currentUser }}>
         {children}
      </AuthContext.Provider>
   );
};
