import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  
  const navigate=useNavigate()

    return (
        <>
        <div className='flex justify-center my-[10%]'> 
        <button 
          className='p-4 bg-red-400 rounded-xl mx-4' 
          onClick={() => navigate("/login", { state: { role: 'admin' } })}
        >
          Admin
        </button>
      
        <button 
          className='p-4 bg-red-400 rounded-xl mx-4' 
          onClick={() => navigate("/login", { state: { role: 'user' } })}
        >
          User
        </button>
        </div>
      </>
      
  )
}
