import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
export default function Signin() {

    const location = useLocation();
  const role = location.state?.role; // 'admin' or 'user'
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle login action
  const login = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Define API endpoint based on role
      const endpoint = role === 'admin' ? '/api/admins/login' : '/api/users/login';
      const apiUrl = `http://localhost:5000${endpoint}`;

      // Make POST request to login API
      const response = await axios.post(apiUrl, {
        email,
        password
      });
      localStorage.setItem(email,response.data.token)
      if(role=='admin')
      navigate("/admindashboard",{state:{email}})
        else
        navigate("/userdashboard",{state:{email}})
      // Assuming backend responds with success or failure
    
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        alt="Your Company"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        className="mx-auto h-10 w-auto"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={(e)=>login(e)}
          >
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}
        <button  onClick={()=>navigate("/signup",{state:{role}})}className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Register
        </button>
      </p>
    </div>
  </div>
</>
  )
}
