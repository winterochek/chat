import React from 'react';

export const MessageComponent = () => {
   return (
      <div className='message owner'>
         <div className='messageInfo'>
            <img
               src='https://variety.com/wp-content/uploads/2022/08/Jonah-Hill.jpg?w=681&h=383&crop=1'
               alt=''
            />
            <span>just now</span>
         </div>
         <div className='messageContent'>
            <p>Hello</p>
            <img
               src='https://variety.com/wp-content/uploads/2022/08/Jonah-Hill.jpg?w=681&h=383&crop=1'
               alt=''
            />
         </div>
      </div>
   );
};
