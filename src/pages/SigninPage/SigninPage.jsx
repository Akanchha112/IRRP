import React, { useState } from 'react';
import { auth, firestore } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore";
import "./signin.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../../components/common/Navbar/Navbar';
import Navbar from '../../components/landingNavbar/Navbar';
import { useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState("faculty");
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async () => {
    setloading(true);
    setEmailError('')
    setPasswordError('')
    if ('' === email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter your email')
      return
    }
    if ('' === password || password.length < 7) {
      setPasswordError('Password length must be 6')
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user.uid, role);

      //to check user role
      const userDoc = doc(firestore, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);
      // console.log(userSnapshot)

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const userRole = userData.role;
        console.log(userRole, role);
        if (userRole === role) {
          toast.success("LoggedIn Successfully", { position: "top-center" });
          localStorage.setItem('role', role);
          // console.log(userData);
          localStorage.setItem('userdata', JSON.stringify(userData));  //to store an object
          localStorage.setItem('uid', user.uid);
          if (role == 'admin') {
            navigate('/admin')
          }  else if (role == 'faculty') {
            navigate('/faculty')
          }
          setloading(false);
        }
        else {
          toast.info("User not found", { position: "top-center" });
        }
      }
      else {
        toast.info("User not found", { position: "top-center" });
      }

    }
    catch (error) {
      console.error(error);
      toast.success(error.msg, { position: "bottom-center" });
    }
    setEmail('');
    setPassword('');
    setloading(false);
  }

  return <>
    <Navbar />
    <div className="signin-container">
      {loading ?
        <BeatLoader
          color="#1E4D0F"
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
        <div className='signin-Card'>
          <h2>Sign In</h2>
          <div className='inputContainer'>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
            <label className="errorLabel">{emailError}</label>
          </div>
          <div className='inputContainer'>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <div className='role'>
            <label>Role:</label>
            <select value={role} onChange={(e) => { setRole(e.target.value); console.log(role); }}>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button onClick={handleSignin}>Sign In</button>
          {/* <label>Don't have account?<span className='signnavigator' onClick={() => { navigate('/signup') }}> Sign Up</span></label> */}
        </div>
      }

    </div>
  </>
}
export default SigninPage;