import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const [assignments, setAssignments] = useState([]);
  const location = useLocation();
  const navigate=useNavigate()
  const { email } = location.state;

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`https://assignment-submission-portal-2l3c.onrender.com/api/admins/assignments/${email}`);
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
    fetchAssignments();
  }, [email]);

  // Function to handle accepting an assignment
  const handleAccept = async (assignmentId) => {
    
    try {
      const response = await axios.put(`https://assignment-submission-portal-2l3c.onrender.com/api/admins/assignments/${assignmentId}/accept`);
      console.log(response)
      if (response.data.success) {
        // Update the assignments in the state
        setAssignments(assignments.map(assignment =>
          assignment._id === assignmentId ? { ...assignment, status: 'accepted' } : assignment
        ));
      } else {
        console.error('Error accepting assignment:', response.data.message);
      }
    } catch (error) {
      console.error('Error accepting assignment:', error);
      alert('Failed to accept the assignment. Please try again later.');
    }

    window.location.reload()
  };

  // Function to handle rejecting an assignment
  const handleReject = async (assignmentId) => {
    try {
      const response = await axios.put(`https://assignment-submission-portal-2l3c.onrender.com/api/admins/assignments/${assignmentId}/reject`);
      console.log(response)
      
        setAssignments(assignments.map(assignment =>
          assignment._id === assignmentId ? { ...assignment, status: 'rejected' } : assignment
        ));
       
      
    } catch (error) {
      console.error('Error rejecting assignment:', error);
      alert('Failed to reject the assignment. Please try again later.');
    }

    window.location.reload()
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
      <h2 className='text-lg font-semibold mb-2'>Assignments Requests</h2>
      
      <div className='min-h-screen flex justify-center'>
        <div className='mt-6 w-full max-w-md bg-white shadow-md rounded-lg p-4'>
          <ul>

            {assignments.map((assignment) => (
              <li key={assignment._id} className='border-b py-2'>
                <p><strong>Task:</strong> {assignment.task}</p>
                <p><strong>Status:</strong> {assignment.status}</p>
                <p><strong>Created By </strong>{assignment.userId}</p>
                <p><strong>Creation Time </strong>{assignment.createdAt}</p>
                {assignment.status=='pending'?<div className='mt-4'>
                  <button
                    className='bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600'
                    onClick={() => handleAccept(assignment._id)}
                    disabled={assignment.status !== 'pending'}
                  >
                    Accept
                  </button>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                    onClick={() => handleReject(assignment._id)}
                    disabled={assignment.status !== 'pending'}
                  >
                    Reject
                  </button>
                </div>:""}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
