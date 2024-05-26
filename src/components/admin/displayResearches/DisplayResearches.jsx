import { useEffect, useState } from 'react';
import "./index.css";
import { auth, firestore } from '../../../services/firebase';
import { doc,getDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";

const DisplayResearches = () => {
    const [research, setResearch] = useState([]);
    const [loading, setloading] = useState(false);
    const profid = localStorage.getItem('uid');
    const navigate = useNavigate();
    // console.log(profid);

    useEffect(() => {
        const getFacultyname= async (facultyId)=>{
            setloading(true);
            const userDoc = doc(firestore, "users", facultyId);
            const userSnapshot = await getDoc(userDoc);
            const userData = userSnapshot.data().name;
            return userData;
        }
        try {
            const fetchJobs = async () => {
                const researchRef = collection(firestore, "research");
                const q = query(researchRef, where("status", "==", "open"));
                const querySnapshot = await getDocs(q);

                const researchData = {};

                querySnapshot.forEach(async (doc) => {
                    const data = doc.data();
                    const facultyId = data.facultyId;
                    const facultyname=await getFacultyname(facultyId);
                    if (!researchData[facultyId]) {
                        researchData[facultyId] = {
                            facultyId: facultyId,
                            facultyname: facultyname,
                            count: 0,
                            researchItems: []
                        };
                    }

                    researchData[facultyId].count += 1;
                    researchData[facultyId].researchItems.push(data);
                });

                // Convert the researchData object to an array
                const researchArray = Object.values(researchData);
                setResearch(researchArray);

                return research;
            };

            fetchJobs();
        } catch (error) {
            console.error('Error fetching professors:', error);
        }
    }, []);

    useEffect(() => {
        setloading(true)
        setTimeout(() => {
            setloading(false);
        }, 2000);
    }, [])
    const handleClose = async (jobId) => {
        try {
            await deleteDoc(doc(firestore, "jobs", jobId));
            toast.success("Deleted Successfully", { position: "top-center" });
        } catch (error) {
            toast.success(error.msg, { position: "bottom-corner" });
            console.error('Error fetching professors:', error);
        }
    }

    const handleResponse = (jobId) => {
        navigate(`/getresponse/${jobId}`);
    }

    return <>
        <div className='professorsjobs'>
            {loading ?

                <BeatLoader
                    color="#00a2bb"
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                :
                <div className="professorsjobs-container">
                    <h2>Jobs</h2>

                    <ul className='subcontainer'>
                        {!loading && research.length !== 0 ? research.map((facultyResearch) => (

                            <p key={facultyResearch.facultyId} className="eachjob">

                                <h2>Faculty Name: {facultyResearch.facultyname}</h2>
                                <p>Research Count: {facultyResearch.count}</p>
                                <ul>
                                    {facultyResearch.researchItems.map((item, index) => (
                                        <li key={index}>{JSON.stringify(item)}</li>
                                    ))}
                                </ul>
                                
                                <button onClick={() => { handleResponse(facultyResearch.facultyId) }}>See All </button>
                            </p>
                        )) : <h3>No Jobs Posted Yet</h3>}
                    </ul>

                </div>
            }
        </div>
    </>
}

export default DisplayResearches;