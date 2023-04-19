import { useContext, useEffect } from 'react';
import { Router } from './router';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import './App.scss';
import { ChatContextProvider } from './context/ChatContext';

function App() {
   const { currentUser } = useContext(AuthContext);

   useEffect(() => {
      if (!currentUser) return;
   }, [currentUser]);

   return (
      <div className='App'>
         <ChatContextProvider>
            <AuthContextProvider>
               <Router />
            </AuthContextProvider>
         </ChatContextProvider>
      </div>
   );
}

export default App;
