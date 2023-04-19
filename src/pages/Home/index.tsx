import React from 'react'
import '../../App.scss'
import { SidebarComponent } from '../../components/Sidebar'
import { ChatComponent } from '../../components/Chat'

export const HomePage = () => {
  return (
    <div className='home'>
      <div className='container'>
        <SidebarComponent />
        <ChatComponent />
      </div>
    </div>
  )
}
