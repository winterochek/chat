import User from '../../assets/user.png';
export const UserChat = ({ user, handleSelect }: any) => {
   return (
      <div className='userChat' onClick={handleSelect}>
         <img
            src={user.photoURL}
            alt={user.displayName}
            onError={(event: any) => (event.target.src = User)}
         />
         <div className='userChatInfo'>
            <span>{user.displayName}</span>
         </div>
      </div>
   );
};
