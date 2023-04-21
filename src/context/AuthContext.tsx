import { FC, createContext, useMemo } from 'react';
import { auth } from '../firebase';
import { MyContext } from '../types';
import { useAuthState } from 'react-firebase-hooks/auth';

export const AuthContext = createContext<MyContext>({
   currentUser: null,
});

export const AuthContextProvider: FC<any> = ({ children }) => {
   // const [currentUser, setCurrentUser] = useState<any | null>(null);
   const [currentUser] = useAuthState(auth);
   const authContext = useMemo(() => {
      return { currentUser };
   }, [currentUser]);

   // useEffect(() => {
   //    const unsubscribe = onAuthStateChanged(auth, (user) => {
   //       setCurrentUser(user);
   //    });

   //    return () => {
   //       unsubscribe();
   //    };
   // }, []);

   return (
      <AuthContext.Provider value={authContext}>
         {children}
      </AuthContext.Provider>
   );
};
