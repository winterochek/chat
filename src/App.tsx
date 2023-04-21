import { useContext, useEffect } from 'react';
import { Router } from './router';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import './App.scss';
import { ChatContextProvider } from './context/ChatContext';
import { SideContextProvider } from './context/SideContext';

function App() {
   const { currentUser } = useContext(AuthContext);

   useEffect(() => {
      if (!currentUser) return;
   }, [currentUser]);

   return (
      <div className='App'>
         <SideContextProvider>
            <AuthContextProvider>
               <ChatContextProvider>
                  <Router />
               </ChatContextProvider>
            </AuthContextProvider>
         </SideContextProvider>
      </div>
   );
}

export default App;
