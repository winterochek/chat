import { createContext, FC, useState, useCallback, useEffect } from 'react';

export const SideContext = createContext<any>(null);

export const SideContextProvider: FC<any> = ({ children }: any) => {
   const [visible, setVisible] = useState(true);
   const [width, setWidth] = useState(window.innerWidth);

   const status =
      width < 440
         ? 'mobile'
         : width < 840
         ? 'tablet'
         : width < 1200
         ? 'laptop'
         : 'monitor';

   const handleCloseSidebar = useCallback(() => {
      setVisible(false);
   }, []);

   const handleOpenSidebar = useCallback(() => {
      setVisible(true);
   }, []);

   useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return (
      <SideContext.Provider
         value={{ visible, status, handleCloseSidebar, handleOpenSidebar }}
      >
         {children}
      </SideContext.Provider>
   );
};
