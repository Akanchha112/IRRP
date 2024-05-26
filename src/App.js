import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage/SignupPage';
import AdminDash from './pages/admin/DashBoard/Dashboard';
import AddFaculty from './pages/admin/AddFaculty';
import Profile from './components/common/profile/Profile';
import ProfileEdit from './components/common/profile/ProfileEdit';
import ProfDashboard from './pages/prof/dashboard/ProfDashboard';
import ViewResponse from './pages/prof/Response/ViewResponse';
import {ToastContainer} from "react-toastify";
import JobSearch from './pages/JobSearch/JobSearch';
import ViewDetails from './components/student/ViewDetails/ViewDetails';
import Apply from './components/student/Apply/Apply';
import Applied from './components/faculty/Applied/Applied';
import Secure from './components/common/Secure/Secure';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/signin" element={<SigninPage/>} />
        <Route path="/admin" element={< Secure component = {AdminDash} />} />
        <Route path="/addfaculty" element={< Secure component = {AddFaculty} />} />
        <Route path="/profile" element={< Secure component = {Profile} />} />
        <Route path='/profileedit/:uid' element={< Secure component = {ProfileEdit} />} />
        {/* <Route path="/student" element={< Secure component = {JobSearch} />}/> */}

        {/* <Route path="/ViewDetails/:jobId" element={< Secure component = {ViewDetails} />}/> */}
        {/* <Route path="/Apply/:jobId" element={< Secure component = {Apply} />}/> */}
        <Route path="/applied" element={< Secure component = {Applied} />}/>

        <Route path="/faculty" element={< Secure component = {ProfDashboard} />}/>
        <Route path="/getresponse/:jobId" element={< Secure component = {ViewResponse} />} />

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
