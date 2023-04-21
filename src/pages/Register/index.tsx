import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db, storage } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import Add from '../../assets/addAvatar.png';
import Attach from '../../assets/attach.png';
import { AuthContext } from '../../context/AuthContext';
import '../../App.scss';

export const RegisterPage = () => {
   const [error, setError] = useState(false);
   const navigate = useNavigate();
   const [image, setImage] = useState<any>(null);
   const { currentUser } = useContext(AuthContext);

   const handleSubmit = async (e: any) => {
      e.preventDefault();
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];
      try {
         const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
         );

         const storageRef = ref(storage, displayName);

         const uploadTask = uploadBytesResumable(storageRef, file);

         uploadTask.on(
            'state_changed',
            () => {},
            (error) => {
               setError((prev) => true);
            },
            () => {
               getDownloadURL(uploadTask.snapshot.ref).then(
                  async (downloadURL) => {
                     await updateProfile(response.user, {
                        displayName,
                        photoURL: downloadURL,
                     });
                     await setDoc(doc(db, 'users', response.user.uid), {
                        uid: response.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                     });
                     await setDoc(doc(db, 'userChats', response.user.uid), {});

                     navigate('/');
                  }
               );
            }
         );
      } catch (e) {
         setError((prev) => true);
      }
   };

   useEffect(() => {
      if (!currentUser) return;
      navigate('/');
   }, [currentUser]);

   return (
      <div className='container'>
         <div className='formWrapper'>
            <span className='logo'>Chat</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
               <input type='text' placeholder='name' />
               <input type='email' placeholder='email' />
               <input type='password' placeholder='password' />
               <input
                  style={{ display: 'none' }}
                  type='file'
                  onChange={(event: any) => setImage(event.target.files[0])}
                  id='inputFile'
               />
               <div>
                  {image && (
                     <img
                        src={Attach}
                        alt='attachment'
                        onClick={(event: any) => setImage(null)}
                     />
                  )}
                  <label htmlFor='inputFile'>
                     <img src={Add} alt='Add_avatar' />
                     <span>Add an avatar</span>
                  </label>
               </div>
               <button>Sign up</button>
               {error && <span>Something went wrong</span>}
            </form>
            <p>
               Do you have an account?<Link to='/login'>Login</Link>
            </p>
         </div>
      </div>
   );
};
