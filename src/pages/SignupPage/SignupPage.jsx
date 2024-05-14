import React, { useState } from 'react';
import { auth, firestore } from '../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import "./signup.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/common/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import Footer from "../../components/common/Footer/Footer";
const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('faculty');
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
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
    if (role == "professor") {
      toast.error("Contact your university to register your mail");
      return
    }
    try {

      await createUserWithEmailAndPassword(auth, email, password);  //to create user auth
      const user = auth.currentUser;
      console.log(user.uid, role);

      if (user) {
        await setDoc(doc(firestore, "users", user.uid), {              // to save user credentials in database
          name:name,
          email: user.email,
          role: role
        });
      }
      localStorage.setItem('role', role);
      localStorage.setItem('userdata', JSON.stringify(user));
      localStorage.setItem('uid', user.uid);

      toast.success("Registered Successfully", { position: "top-center" });
      if (role == 'admin') {
        navigate('/admin')
      }

      setloading(false);

      // Redirect or show success message
    } catch (error) {
      console.error(error);
      toast.success(error.msg, { position: "bottom-center" });
      // Handle error
    }
    setEmail('');
    setPassword('');
    setloading(false);
  };




  return <>
    <Navbar />

    <div className="signup-container">
      {loading ?
        <BeatLoader
          color="#00a2bb"
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
        <div className='signup-Card'>
          <h2>Sign Up</h2>
          <div className='inputContainer'>
            <label>Name:</label>
            <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your Name' />
          </div>
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
          <div>
            <label>Role:</label>
            <select value={role} onChange={(e) => { setRole(e.target.value);  }} placeholder='role'>
            <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button onClick={handleSignUp}>Sign Up</button>
          <label>Already have account?<span className='signnavigator' onClick={() => { navigate('/signin') }}> Sign in</span></label>
        </div>
      }
    </div>
    
    <Footer/>
  </>
};

export default SignupPage;
