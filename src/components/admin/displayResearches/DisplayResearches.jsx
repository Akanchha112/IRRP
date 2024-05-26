import { useEffect, useState } from 'react';
import "./index.css";
import { firestore } from '../../../services/firebase';
import { doc, getDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";

const DisplayResearches = () => {
    const [research, setResearch] = useState([]);
    const [loading, setLoading] = useState(false);
    const profid = localStorage.getItem('uid');
    const navigate = useNavigate();
    
    useEffect(() => {
        const getFacultyName = async (facultyId) => {
            const userDoc = doc(firestore, "users", facultyId);
            const userSnapshot = await getDoc(userDoc);
            return userSnapshot.exists() ? userSnapshot.data().name : "Unknown";
        };

        const fetchJobs = async () => {
            try {
                setLoading(true);
                const researchRef = collection(firestore, "research");
                const q = query(researchRef, where("status", "==", "pending"));
                const querySnapshot = await getDocs(q);

                const researchData = {};

                const fetchPromises = querySnapshot.docs.map(async (docSnapshot) => {
                    const data = docSnapshot.data();
                    console.log(data,  data.facultyid)
                    const facultyId = data.facultyid;
                    const facultyName = await getFacultyName(facultyId);

                    if (!researchData[facultyId]) {
                        researchData[facultyId] = {
                            facultyId: facultyId,
                            facultyName: facultyName,
                            count: 0,
                            researchItems: []
                        };
                    }

                    researchData[facultyId].count += 1;
                    researchData[facultyId].researchItems.push(data);
                });

                await Promise.all(fetchPromises);

                const researchArray = Object.values(researchData);
                setResearch(researchArray);
            } catch (error) {
                console.error('Error fetching research:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const handleResponse = (facultyid) => {
        navigate(`/allResearch/${facultyid}`);
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    return (
        <>
            <div className='professorsjobs'>
                {loading ? (
                    <BeatLoader
                        color="#1E4D0F"
                        loading={loading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                ) : (
                    <div className="professorsjobs-container">
                        <h2>Jobs</h2>
                        <ul className='subcontainer'>
                            {research.length ? research.map((facultyResearch) => (
                                <li key={facultyResearch.facultyId} className="eachjob">
                                    <h2>Faculty Name: {facultyResearch.facultyName}</h2>
                                    <h3>Total Researches: {facultyResearch.count}</h3>
                                    
                                    <button onClick={() => handleResponse(facultyResearch.facultyId)}>See All</button>
                                </li>
                            )) : <h3>No Jobs Posted Yet</h3>}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default DisplayResearches;
