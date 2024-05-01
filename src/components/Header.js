import React from 'react'
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);

const Header = () => {
  return (
    <div className='w-full flex justify-around h-14 items-center ' >
     
         <h1 className='text-3xl font-semibold text-blue-600 '>Zime</h1>
      
    </div>
  )
}

export default Header