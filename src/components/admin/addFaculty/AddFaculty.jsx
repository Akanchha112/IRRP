import "./index.css";
import { useState } from "react";
import { auth, firestore } from '../../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from "react-spinners/BeatLoader";

const AddFaculty = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setloading] = useState(false);
    const handleAdd = async (e) => {
        setloading(true);
        e.preventDefault(); // Prevent default form submission
        setEmailError('');
        setPasswordError('');

        if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailError('Please enter a valid email');
            return;
        }

        if (!password || password.length < 6) {
            setPasswordError('Password length must be at least 6 characters');
            return;
        }
        const institueid = localStorage.getItem('uid');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user) {
                await setDoc(doc(firestore, "users", user.uid), {
                    email: user.email,
                    role: 'faculty'
                });
            }

            toast.success("Added Successfully", { position: "top-center" });
            setloading(false);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error(error);
            toast.error(error.message, { position: "bottom-center" });
        }
        setloading(false);
    };

    return (
        <div className="addProfContainer">
            {loading ?
                <BeatLoader
                    color="#00a2bb"
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                :
                <div className="subcontainerAdd">
                    <h1>Add Faculty</h1>
                    <form onSubmit={handleAdd}>
                        <div>
                            <label>Name:</label>
                            <input type="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your Name' required/>
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' />
                            <label className="errorLabel">{emailError}</label>
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
                            <label className="errorLabel">{passwordError}</label>
                        </div>
                        <button type="submit">Add</button>
                    </form>
                </div>
            }
        </div>
    );
}

export default AddFaculty;
