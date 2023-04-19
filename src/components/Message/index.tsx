import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

export const MessageComponent = ({ message }: any) => {
   const { currentUser } = useContext(AuthContext);
   const { data } = useContext(ChatContext);
   return (
      <div
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
            <span>just now</span>
         </div>
         <div className='messageContent'>
            <p>{message.text}</p>
            {message.image && <img src={message.image} alt='' />}
         </div>
      </div>
   );
};
