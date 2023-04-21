import { NavbarComponent } from '../Navbar';
import { SearchComponent } from '../Search';
import { ChatsComponent } from '../Chats';
import { useContext } from 'react';
import { SideContext } from '../../context/SideContext';

export const SidebarComponent = () => {

   return (
      <div className='sidebar active'>
         <NavbarComponent />
         <SearchComponent />
         <ChatsComponent />
      </div>
   );
};
