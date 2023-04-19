import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

export const ChatsComponent = () => {
   const [chats, setChats] = useState<any>([]);
   const { currentUser } = useContext(AuthContext);
   const { dispatch } = useContext(ChatContext);

   const handleSelect = (user: any) => {
      dispatch({ type: 'CHANGE_USER', payload: user });
   };

   useEffect(() => {
      const getChats = () => {
         const unsubscribe = onSnapshot(
            doc(db, 'userChats', currentUser.uid),
            (doc) => {
               setChats(doc.data());
            }
         );

         return () => {
            unsubscribe();
         };
      };

      currentUser.uid && getChats();
   }, [currentUser.uid]);

   return (
      <div className='chats'>
         {Object.entries(chats)?.map((chat: any) => (
            <div
               className='userChat'
               key={chat[0]}
               onClick={(event: any) => handleSelect(chat[1].userInfo)}
            >
               <img src={chat[1].userInfo.photoURL} alt='' />
               <div className='userChatInfo'>
                  <span>{chat[1].userInfo?.displayName}</span>
                  <p>{chat[1].lastMessage?.text}</p>
               </div>
            </div>
         ))}
      </div>
   );
};
