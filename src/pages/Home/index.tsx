import { useContext } from 'react';
import { SidebarComponent } from '../../components/Sidebar';
import { ChatComponent } from '../../components/Chat';
import { SideContext } from '../../context/SideContext';
import '../../App.scss';

export const HomePage = () => {
   const { visible } = useContext(SideContext);

   return (
      <div className='home'>
         <div className='container'>
            {visible && <SidebarComponent />}
            <ChatComponent />
         </div>
      </div>
   );
};
