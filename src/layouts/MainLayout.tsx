import React from 'react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import NavBar from '@/shared/NavBar'

const MainLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar/>
      <main>
        <ScrollArea>
            {children}
        </ScrollArea>
      </main>

    </div>
  )
}

export default MainLayout