import { Separator } from '@/components/ui/separator'
import React from 'react'
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className='mt-4'>
    <Separator/>
      <div className='flex p-4 uppercase justify-center'>
        	copyright{" "}&copy;{new Date().getFullYear()} - <a href='https://github.com/PhomeMyintMo' className='cursor-pointer hover:font-semibold'>Phome Myint Mo</a><span className='flex items-center px-2'><FaGithub/></span>, all rights reserved.
      </div>
    </div>
  )
}
export default Footer