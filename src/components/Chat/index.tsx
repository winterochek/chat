import { useContext } from 'react';
import { MessagesComponent } from '../Messages';
import { InputComponent } from '../Input';
import { ChatContext } from '../../context/ChatContext';
import { TopBar } from './TopBar';
import { SideContext } from '../../context/SideContext';

export const ChatComponent = () => {
   const { data } = useContext(ChatContext);
   const { status, handleCloseSidebar, handleOpenSidebar } =
      useContext(SideContext);

   return (
      <div
         className='chat'
         onClick={
            status === 'mobile' || status === 'tablet'
               ? handleCloseSidebar
               : () => {}
         }
      >
         <TopBar
            name={data.user.displayName}
            handleOpenSidebar={handleOpenSidebar}
         />
         <MessagesComponent />
         <InputComponent />
      </div>
   );
};
