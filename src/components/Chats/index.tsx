import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { SideContext } from '../../context/SideContext';
import { db } from '../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import User from '../../assets/user.png';

export const ChatsComponent = () => {
   const [chats, setChats] = useState<any>([]);
   const { currentUser } = useContext(AuthContext);
   const { dispatch } = useContext(ChatContext);
   const { handleCloseSidebar, status } = useContext(SideContext);

   const handleSelect = async (user: any) => {
      await dispatch({ type: 'CHANGE_USER', payload: user });
      if (status === 'mobile' || status === 'tablet') {
         await handleCloseSidebar();
      }
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
         {chats &&
            Object.entries(chats)
               ?.sort((a: any, b: any) => b[1].date - a[1].date)
               .map((chat: any) => (
                  <div
                     className='userChat'
                     key={chat[0]}
                     onClick={(event: any) => handleSelect(chat[1].userInfo)}
                  >
                     <img
                        src={chat[1].userInfo.photoURL}
                        alt={chat[1].userInfo.displayName}
                        onError={(event: any) => (event.target.src = User)}
                     />
                     <div className='userChatInfo'>
                        <span>{chat[1].userInfo?.displayName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                     </div>
                  </div>
               ))}
      </div>
   );
};
