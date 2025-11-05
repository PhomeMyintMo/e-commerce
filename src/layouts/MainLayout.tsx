import React from 'react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import NavBar from '@/shared/NavBar'
import Footer from '@/shared/Footer'

const MainLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar/>
      <main className='p-4'>
        <ScrollArea>
            {children}
        </ScrollArea>
      </main>
      <Footer/>
    </div>
  )
}

export default MainLayout