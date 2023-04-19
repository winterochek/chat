import { useContext, useState } from 'react';
import {
   collection,
   query,
   where,
   getDocs,
   setDoc,
   doc,
   updateDoc,
   serverTimestamp,
   getDoc,
   DocumentData,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

export const SearchComponent = () => {
   const [username, setUsername] = useState('');
   const [user, setUser] = useState<DocumentData | null>(null);
   const [error, setError] = useState(false);

   const { currentUser } = useContext(AuthContext);
   const {dispatch} = useContext(ChatContext)

   const handleSearch = async () => {
      const q = query(
         collection(db, 'users'),
         where('displayName', '==', username)
      );

      try {
         const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
            setUser(doc.data());
         });
      } catch (e) {
         setError(true);
      }
   };

   const handleKey = (e: any) => {
      e.code === 'Enter' && handleSearch();
   };

   const handleSelect = async () => {
      const combinedId =
         currentUser.uid > user?.uid
            ? currentUser.uid + user?.uid
            : user?.uid + currentUser.uid;

      try {
         const response = await getDoc(doc(db, 'chats', combinedId));
         if (!response.exists()) {
            await setDoc(doc(db, 'chats', combinedId), { messages: [] });
            await updateDoc(doc(db, 'userChats', currentUser.uid), {
               [combinedId + '.userInfo']: {
                  uid: user?.uid,
                  displayName: user?.displayName,
                  photoURL: user?.photoURL,
               },
               [combinedId + '.date']: serverTimestamp(),
            });
            await updateDoc(doc(db, 'userChats', user?.uid), {
               [combinedId + '.userInfo']: {
                  uid: currentUser?.uid,
                  displayName: currentUser?.displayName,
                  photoURL: currentUser?.photoURL,
               },
               [combinedId + '.date']: serverTimestamp(),
            });
         }
         dispatch({ type: 'CHANGE_USER', payload: user });
      } catch (e) {
         setError(true);
      } finally {
         setUser(null);
         setUsername('');
   
      }
   };
   return (
      <div className='search'>
         <div className='searchForm'>
            <input
               type='text'
               placeholder='Find a user'
               value={username}
               onChange={(e: any) => setUsername(e.target.value)}
               onKeyDown={handleKey}
            />
         </div>
         {error && <span>User not found!</span>}
         {user && (
            <div className='userChat' onClick={handleSelect}>
               <img src={user.photoURL} alt='' />
               <div className='userChatInfo'>
                  <span>{user.displayName}</span>
               </div>
            </div>
         )}
      </div>
   );
};
