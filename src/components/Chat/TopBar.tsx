import Cam from '../../assets/cam.png';
import Add from '../../assets/add.png';
import More from '../../assets/more.png';
import Chats from '../../assets/chats.png';

export const TopBar = ({ name, handleOpenSidebar }: any) => {
   const handleSidebar = (event: any) => {
      event.stopPropagation();
      handleOpenSidebar();
   };
   return (
      <div className='chatInfo'>
         <img
            className='open'
            onClick={handleSidebar}
            src={Chats}
            height={24}
            width={24}
         />

         <span>{name}</span>
         <div className='chatIcons'>
            <img src={Cam} alt='Cam' />
            <img src={Add} alt='Add' />
            <img src={More} alt='More' />
         </div>
      </div>
   );
};
