import React from 'react'
import Header from '../components/Header'
import Blog from '../components/Blog'

const Home = () => {
  return (
    <div className='mt-5 relative  mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between'>
        <Header/> 
        <Blog/>
    </div>
  )
}

export default Home