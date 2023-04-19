import React from 'react'
import { NavbarComponent } from '../Navbar'
import { SearchComponent } from '../Search'
import { ChatsComponent } from '../Chats'

export const SidebarComponent = () => {
  return (
    <div className='sidebar'>
        <NavbarComponent />
        <SearchComponent />
        <ChatsComponent />
    </div>
  )
}
