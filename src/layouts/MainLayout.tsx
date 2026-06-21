import React from 'react'
import NavBar from '@/shared/NavBar'
import Footer from '@/shared/Footer'

const MainLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar/>
      <main className='flex-grow overflow-auto'>
            {children}
      </main>
      <Footer/>
    </div>
  )
}

export default MainLayout