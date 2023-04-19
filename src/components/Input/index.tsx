import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import {
   Timestamp,
   arrayUnion,
   doc,
   serverTimestamp,
   updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import Img from '../../assets/img.png';
import Attach from '../../assets/attach.png';

export const InputComponent = () => {
   const [error, setError] = useState(false);
   const [text, setText] = useState<string>('');
   const [image, setImage] = useState<any>(null);
   const { currentUser } = useContext(AuthContext);
   const { data } = useContext(ChatContext);

   const handleSend = async () => {
      if (image) {
         const storageRef = ref(storage, uuid());

         const uploadTask = uploadBytesResumable(storageRef, image);

         uploadTask.on(
            'state_changed',
            () => {},
            (error) => {
               setError((prev) => true);
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then(
                  async (downloadURL) => {
                     await updateDoc(doc(db, 'chats', data.chatId), {
                        messages: arrayUnion({
                           id: uuid(),
                           text,
                           senderId: currentUser.uid,
                           date: Timestamp.now(),
                           image: downloadURL,
                        }),
                     });
                  }
               );
            }
         );
      } else {
         await updateDoc(doc(db, 'chats', data.chatId), {
            messages: arrayUnion({
               id: uuid(),
               text,
               senderId: currentUser.uid,
               date: Timestamp.now(),
            }),
         });
      }

      await updateDoc(doc(db, 'userChats', currentUser.uid), {
         [data.chatId + '.lastMessage']: {
            text,
         },
         [data.chatId + '.date']: serverTimestamp(),
      });

      await updateDoc(doc(db, 'userChats', data.user.uid), {
         [data.chatId + '.lastMessage']: {
            text,
         },
         [data.chatId + '.date']: serverTimestamp(),
      });

      setText('');
      setImage(null);
   };
   return (
      <div className='input'>
         {!error && (
            <>
               <input
                  value={text}
                  type='text'
                  placeholder='Type something'
                  onChange={(event: any) => setText(event.target.value)}
               />
               <div className='send'>
                  <img src={Attach} alt='' />
                  <input
                     type='file'
                     style={{ display: 'none' }}
                     id='inputFile'
                     onChange={(event: any) => setImage(event.target.files[0])}
                  />
                  <label htmlFor='inputFile'>
                     <img src={Img} alt='' />
                  </label>
                  <button onClick={handleSend}>Send</button>
               </div>
            </>
         )}
      </div>
   );
};
