import {
   FC,
   createContext,
   useContext,
   useEffect,
   useReducer,
   useState,
} from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { MyContext } from '../types';
import { AuthContext } from './AuthContext';

export const ChatContext = createContext<any>({
   currentUser: null,
});

export const ChatContextProvider: FC<any> = ({ children }) => {
   const { currentUser } = useContext(AuthContext);

   const INITIAL_STATE: { chatId: any; user: any } = {
      chatId: 'null',
      user: {},
   };

   const chatReducer = (state: any, action: any) => {
      switch (action.type) {
         case 'CHANGE_USER':
            return {
               user: action.payload,
               chatId:
                  currentUser?.uid > action.payload?.uid
                     ? currentUser?.uid + action.payload?.uid
                     : action.payload?.uid + currentUser?.uid,
            };
         default:
            return state;
      }
   };

   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

   return (
      <ChatContext.Provider value={{ data: state, dispatch }}>
         {children}
      </ChatContext.Provider>
   );
};
