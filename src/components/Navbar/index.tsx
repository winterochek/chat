import { useContext, useRef, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import User from '../../assets/user.png';

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
            <img
               src={currentUser.photoURL}
               alt={currentUser.displayName}
               onError={(event: any) => (event.target.src = User)}
            />
            <span>{currentUser.displayName}</span>
            <button onClick={handleSignOutClick}>Logout</button>
         </div>
      </div>
   );
};
