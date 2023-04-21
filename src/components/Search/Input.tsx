export const Input = ({ userState, handleKey }: any) => {
   return (
      <div className='searchForm'>
         <input
            type='text'
            placeholder='Find a user'
            value={userState.username}
            onChange={(e: any) => userState.setUsername(e.target.value)}
            onKeyDown={handleKey}
         />
      </div>
   );
};
