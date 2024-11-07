import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import './App.css'
import Login from './page/Login';
import Register from './page/Register';
import FacultyRegister from './components/register/FacultyRegister';
import StudentRegister from './components/register/StudentRegister';
import AssignTask from './components/task/AssignTask';
import Home from './components/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddTask from './components/task/AddTask';
import ContestForm from "./components/ContestForm";
import ChallengeForm from "./components/ChallengeForm";
import ViewTask from './components/task/ViewTask';
import StudentTest from './page/StudentTest';
import Sheet from './components/Interview/Sheet';
function App() {
  return (
    <>
    <ToastContainer/>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/createFaculty' element={<FacultyRegister/>}/>
          <Route path='/createStudent' element={<StudentRegister/>}/>
          <Route path='/task' element={<AssignTask/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/createTask' element={<AddTask/>}/>
          <Route path="/contest" element={<ContestForm />} />
          <Route path="/challenge/:contestId" element={<ChallengeForm />} />
          <Route path="/view" element={<ViewTask/>} />
          <Route path="/test" element={<StudentTest/>} />
          <Route path="/sheet" element={<Sheet/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
