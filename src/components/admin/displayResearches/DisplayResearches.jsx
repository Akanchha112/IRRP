import { useEffect, useState } from 'react';
import "./index.css";
import { auth, firestore } from '../../../services/firebase';
import { doc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";

const DisplayResearches = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setloading] = useState(false);
    const profid = localStorage.getItem('uid');
    const navigate = useNavigate();
    // console.log(profid);

    useEffect(() => {

        const fetchJobs = async () => {
            try {

                const fetchJobs = async (profid) => {
                    const JobsRef = collection(firestore, "jobs");
                    const q = query(JobsRef, where("status", "==", "open"), where("professorid", "==", profid));
                    const querySnapshot = await getDocs(q);

                    const jobs = [];
                    querySnapshot.forEach((doc) => {

                        jobs.push(doc);
                    });//doc.data(),doc.ref.id
                    // console.log(jobs)
                    setJobs(jobs)

                    return jobs;
                };

                fetchJobs(profid).then((job) => {
                    // console.log("Jobs:", job);
                });

            } catch (error) {
                console.error('Error fetching professors:', error);
            }

        };

        fetchJobs();
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
                        {!loading && jobs.length !== 0?jobs.map((job, index) => (

                            <p key={index} className="eachjob">

                                <h3>{job.data().postion}</h3>
                                <p>Description: {job.data().description}</p>
                                <p>Status: {job.data().status}</p>
                                <p>Stipend: {job.data().stipend}</p>
                                <p>Duration: {job.data().duration}</p>
                                <button onClick={() => { handleClose(job.ref.id) }}>Close Job</button>
                                <button onClick={() => { handleResponse(job.ref.id) }}>Responses</button>
                            </p>
                        )):<h3>No Jobs Posted Yet</h3>}
                    </ul>

                </div>
            }
        </div>
    </>
}

export default DisplayResearches;