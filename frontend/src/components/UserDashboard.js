import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function AssignmentUpload() {
  const [task, setTask] = useState('');
  const [admin, setAdmin] = useState('');
  const [assignments, setAssignments] = useState([]);
  const location = useLocation();
  const { email } = location.state || {}; // Get email from state, default to empty if not available
  const navigate=useNavigate()
  useEffect(()=>{
    const fetchAssignments = async () => {
      try {
         
        const response = await axios.get(`https://assignment-submission-portal-2l3c.onrender.com/api/users/assignments/${email}`);
        if (response.data.success) {
          setAssignments(response.data.assignments);
        } else {
          console.error('Error fetching assignments:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
        alert('Failed to fetch assignments. Please try again later.');
      }
    };
    fetchAssignments()
  },[])
  
  

  const handleUpload = async () => {
    if (task.trim() === '') {
      alert('Please enter a task before uploading!');
      return;
    }
    if (admin.trim() === '') {
      alert('Please enter a admin before uploading!');
      return;
    }
    try {
      const response = await axios.post("https://assignment-submission-portal-2l3c.onrender.com/api/users/upload", {
        userId: email, // Assuming email is being used as userId; consider using user ID instead
        task: task,
        admin: admin, // Ensure admin ID is set correctly
      });

    
        console.log('Task uploaded successfully:', task);
        alert('Task uploaded successfully!');
       
     
    } catch (error) {
      console.error('Error uploading task:', error);
      alert('An error occurred while uploading the task. Please try again.');
    } finally {
      setAdmin('s')
      setTask(''); // Clear the input field after upload regardless of success or error
      window.location.reload()
    }
  };

  const logout=()=>{

    localStorage.removeItem(email)
    navigate("/login",{
      state:{
        email
      }
    })
  }
  return (
    <>
    {localStorage.getItem(email)?<button className='float-right p-3 bg-red-500 mx-5 rounded-full' onClick={()=>logout()}>Logout</button>:""}
    <div className='flex flex-col items-center justify-center min-h-screen p-4'>
    
      <div className='w-full max-w-md bg-white shadow-md rounded-lg p-6'>
        <label className='block text-sm font-medium leading-6 text-gray-900 mb-2'>Task</label>
        <input
          className='border-4 border-gray-300 rounded-md p-2 w-full'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder='Enter your task here...'
        />
        <label className='block text-sm font-medium leading-6 text-gray-900 mb-2 mt-4'>Admin</label>
        <input
          className='border-4 border-gray-300 rounded-md p-2 w-full'
          value={admin}
          onChange={(e) => setAdmin(e.target.value)}
          placeholder='Enter Admin here...'
        />
        <button
          className='mt-4 p-4 w-full rounded-full bg-red-500 text-white hover:bg-red-400'
          onClick={handleUpload}
        >
          Upload Assignment
        </button>
      </div>
    
      {/* Optional: Display the list of assignments */}
      <div className='mt-6 w-full max-w-md bg-white shadow-md rounded-lg p-4'>
        <h2 className='text-lg font-semibold mb-2'>Assignments</h2>
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment._id} className='border-b py-2'>
              <p><strong>Task:</strong> {assignment.task}</p>
              <p1><strong>Admin: </strong>{assignment.admin}</p1>
              <p><strong>Status:</strong> {assignment.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}
