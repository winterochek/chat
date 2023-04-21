import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../../context/AuthContext';
import '../../App.scss';

export const LoginPage = () => {
   const [error, setError] = useState(false);
   const navigate = useNavigate();

   const handleSubmit = async (e: any) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;
      try {
         await signInWithEmailAndPassword(auth, email, password);
         navigate('/');
      } catch (e) {
         setError((prev) => true);
      }
   };

   const { currentUser } = useContext(AuthContext);

   useEffect(() => {
      if (!currentUser) return;
      navigate('/');
   }, [currentUser]);

   // if (!currentUser) return <div className='container'></div>;

   return (
      <div className='container'>
         <div className='formWrapper'>
            <span className='logo'>Chat</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
               <input type='email' placeholder='email' />
               <input type='password' placeholder='password' />
               <button>Sign in</button>
               {error && <span>Something went wrong</span>}
            </form>
            <p>
               You dont have an account? <Link to='/register'>Register</Link>
            </p>
         </div>
      </div>
   );
};
