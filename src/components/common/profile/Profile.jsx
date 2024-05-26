import "./profile.css"
import { useState, useEffect } from 'react';
import InstituteNav from "../../admin/AdminNav/AdminNav";
import StuNav from "../../student/studentNav/StuNav";
import ProfNav from "../../faculty/profNav/ProfNav";
import { useNavigate } from "react-router-dom";
import { doc,  getDoc } from "firebase/firestore";
import { firestore } from '../../../services/firebase';

import BeatLoader from "react-spinners/BeatLoader";

const Profile = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const role = localStorage.getItem('role');
    const uid = localStorage.getItem('uid');
    const [Name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [College, setCollege] = useState(null);
    const [qualification, setQualification] = useState(null);
    const [areaOfWork, setAreaOfWork] = useState(null);
    const [loading, setloading] = useState(true);

    //to add cdn link
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);
    // var { Name = null, description = null, Education = null, College = null, qualification = null, areaOfWork = null } = {};
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const userDoc = doc(firestore, "users", uid);
                const userSnapshot = await getDoc(userDoc);
                const userData = userSnapshot.data();


                setName(userData.name);
                setDescription(userData.description);
                if (role !== 'institute') {
                    setCollege(userData.college);
                    setQualification(userData.qualification);
                    setAreaOfWork(userData.areaofWork);
                    console.log(userData.areaofWork)
                }

            } catch (error) {
                console.error('Error fetching professors:', error);
            }
        }
        fetchdata();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setloading(false);
        }, 1500);
    }, [])

    const ProfileEditHandle = () => {
        const uid = localStorage.getItem('uid');
        navigate(`/profileedit/${uid}`);
    }

    return <>
        {role === 'institute' ? <InstituteNav /> : (role === 'professor' ? <ProfNav /> : <StuNav />)}
        <div className="profilecontaitner">
            {loading ?

                <BeatLoader
                    color="#1E4D0F"
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                :
                <main className="profile">
                    <div className="profile-bg"></div>
                    <section className="container">
                        <aside className="profile-image">
                            <img
                                src={"https://images.pexels.com/photos/8114406/pexels-photo-8114406.jpeg?auto=compress&cs=tinysrgb&w=600"}

                            />

                        </aside>
                        <section className="profile-info">
                            <h2 className="first-name">{Name}</h2>

                            <div className="areaOfWork">Area of Work: {areaOfWork} </div >

                        </section>
                        <p className="profile-info description">

                            {description ? description : <div> hello, I'm {Name ? Name : null} and my major {areaOfWork}. </div>}
                        </p>
                        {role !== 'institute' && (<div className="otherInfo">


                        <span><h3 className="Qualification">Qualification: {qualification ? qualification : "no information"}</h3></span>
                            <span><h3 className="Qualification">Description: {College ? College : "no information"}</h3></span>


                        </div>)}
                        <div className="social-profile">


                            <a><i className="fa fa-envelope"></i></a>
                            {/* <a><i className="fa fa-instagram"></i></a> */}
                            <a><i className="fa fa-linkedin"></i></a>
                            <a><i className="fa fa-twitter"></i></a>


                        </div>

                        <button onClick={() => { ProfileEditHandle() }}>Edit</button>
                    </section>
                    {/* <button className="icon close"></button> */}
                </main>
            }
        </div>
    </>
}
export default Profile;