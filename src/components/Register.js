import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get role (admin/user) from navigation state
  const role = location.state?.role || 'user'; // default to 'user' if not provided

  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle register action
  const register = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    try {
      // Define API endpoint based on role
      const endpoint = role === 'admin' ? '/api/admins/register' : '/api/users/register';
      const apiUrl = `http://localhost:5000${endpoint}`;
      console.log(apiUrl);

      // Make POST request to register API
      const response = await axios.post(apiUrl, {
        name,
        email,
        password,
      });

      // Handle success or failure
      if (response.data.success) {
        alert(`${role === 'admin' ? 'Admin' : 'User'} registration successful!`);
        navigate('/login', { state: { role } }); // Navigate to login page
      } else {
        alert('Registration failed: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration: ' + (error.response?.data?.message || error.message));
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
            Sign Up as {role === 'admin' ? 'Admin' : 'User'}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={register}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register as {role === 'admin' ? 'Admin' : 'User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

