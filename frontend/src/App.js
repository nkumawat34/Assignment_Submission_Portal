import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Signin from './components/Signin';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <div className="App mt-5">
     <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<><HomePage /></>} />
      <Route path="/login" element={<Signin/>}></Route>
      <Route path="/signup" element={<Register/>}></Route>
      <Route path="/userdashboard" element={<UserDashboard/>}></Route>
      <Route path="/admindashboard" element={<AdminDashboard/>}></Route>
    </Routes>
    
  </BrowserRouter>

      
    </div>
  );
}

export default App;
