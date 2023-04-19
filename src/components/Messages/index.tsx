import { useContext, useEffect, useState } from 'react';
import { MessageComponent } from '../Message';
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export const MessagesComponent = () => {
   const [messages, setMessages] = useState<any>([]);

   const { data } = useContext(ChatContext);

   useEffect(() => {
      const unsubscribe = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
         doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
         unsubscribe();
      };
   }, [data]);
   return (
      <div className='messages'>
         {messages.map((message: any) => (
            <MessageComponent message={message} key={message.id} />
         ))}
      </div>
   );
};
