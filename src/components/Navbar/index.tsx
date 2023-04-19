import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';

export const NavbarComponent = () => {
   const { currentUser } = useContext(AuthContext);

   const handleSignOutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      signOut(auth);
   };
   return (
      <div className='navbar'>
         <span className='logo'>Chat</span>
         <div className='user'>
            <img src={currentUser.photoURL} alt='' />
            <span>{currentUser.displayName}</span>
            <button onClick={handleSignOutClick}>logout</button>
         </div>
      </div>
   );
};
