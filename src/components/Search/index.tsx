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
} from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { Input } from './Input';
import { UserChat } from './UserChat';

export const SearchComponent = () => {
   const [username, setUsername] = useState('');
   const [user, setUser] = useState<any | null>(null);
   const [error, setError] = useState(false);

   const { currentUser } = useContext(AuthContext);

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

   const handleKey = async (e: any) => {
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
         // dispatch({ type: 'CHANGE_USER', payload: user });
      } catch (e) {
      }
      setUser(null);
      setUsername('');
   };
   return (
      <div className='search'>
         <Input userState={{ username, setUsername }} handleKey={handleKey} />
         {error && <span>User not found!</span>}
         {user && <UserChat user={user} handleSelect={handleSelect} />}
      </div>
   );
};
