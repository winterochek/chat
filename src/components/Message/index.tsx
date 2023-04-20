import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { useDate } from '../../utils';

export const MessageComponent = ({ message }: any) => {
   const { currentUser } = useContext(AuthContext);
   const { data } = useContext(ChatContext);
   const date = useDate(message.date);
   const ref = useRef<any>(null);

   useEffect(() => {
      ref.current.scrollIntoView({
         behavior: 'smooth',
         block: 'end',
         inline: 'nearest',
      });
   }, [message]);

   return (
      <div
         ref={ref}
         className={`message ${
            message.senderId === currentUser.uid && 'owner'
         }`}
      >
         <div className='messageInfo'>
            <img
               src={
                  message.senderId === currentUser.uid
                     ? currentUser.photoURL
                     : data.user.photoURL
               }
               alt=''
            />
            <span>{date}</span>
         </div>
         <div className='messageContent'>
            {message.text && <p>{message.text}</p>}
            {message.image && <img src={message.image} alt='' />}
         </div>
      </div>
   );
};
