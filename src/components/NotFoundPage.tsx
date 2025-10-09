import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react';


const NotFoundPage: React.FC = () => {
  return (
    <div className=''>
    <h1 className='text-3xl font-semibold text-slate-600 mb-8'>
        Oops! Page Not Found :(
    </h1>
        <Link to="/" className='flex flex-row gap-2 justify-center items-center'>
        <span><ChevronLeft/></span>Go to Home
        </Link>
    </div>
  )
}

export default NotFoundPage