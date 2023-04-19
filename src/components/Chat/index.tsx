import {useContext} from 'react';
import Cam from '../../assets/cam.png';
import Add from '../../assets/add.png';
import More from '../../assets/more.png';
import { MessagesComponent } from '../Messages';
import { InputComponent } from '../Input';
import { ChatContext } from '../../context/ChatContext';

export const ChatComponent = () => {
   const { data } = useContext(ChatContext);
   return (
      <div className='chat'>
         <div className='chatInfo'>
            <span>{data.user?.displayName}</span>
            <div className='chatIcons'>
               <img src={Cam} alt='Cam' />
               <img src={Add} alt='Add' />
               <img src={More} alt='More' />
            </div>
         </div>
         <MessagesComponent />
         <InputComponent />
      </div>
   );
};
