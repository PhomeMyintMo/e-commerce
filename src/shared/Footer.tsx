import { Separator } from '@/components/ui/separator'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className='mt-4'>
    <Separator/>
      <div className='p-4'>
        	&copy;2025 - <a href='https://github.com/PhomeMyintMo' className='cursor-pointer hover:font-semibold'>Phome Myint Mo</a> 
      </div>
    </div>
  )
}
export default Footer