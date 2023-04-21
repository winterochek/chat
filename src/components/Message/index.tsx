import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { useDate } from '../../utils';
import User from '../../assets/user.png';

export const MessageComponent = ({ message }: any) => {
   const { currentUser } = useContext(AuthContext);
   const { data } = useContext(ChatContext);
   const date = useDate(message.date);

   const mine = message.senderId === currentUser.uid ? true : false;

   return (
      <div className={`message ${mine && 'owner'}`}>
         <div className='messageInfo'>
            <img
               src={mine ? currentUser.photoURL : data.user.photoURL}
               alt={mine ? currentUser.displayName : data.user.displayName}
               onError={(event: any) => (event.target.src = User)}
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
