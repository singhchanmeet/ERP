import React from 'react'
import comingsoonpng from "../assets/coming_search_soon.png" 
const ComingSoon = () => {
  return (
    <div className="h-screen container mx-auto mt-8">
    <h1 className='text-4xl text-black py-2'>Functionality Coming Soon</h1>
    <img src={comingsoonpng} alt="" />
    </div>
  )
}

export default ComingSoon