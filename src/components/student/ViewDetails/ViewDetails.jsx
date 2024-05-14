//jobsearch->view details
import { useEffect, useState } from 'react';
import './ViewDetails.css';
import StuNav from '../studentNav/StuNav';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore } from '../../../services/firebase';
import { getDoc, doc } from "firebase/firestore";
import BeatLoader from "react-spinners/BeatLoader";


const ViewDetails = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const { jobId } = useParams();

  const [job, setJobs] = useState([]);
  //fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchJobs = async () => {

          const JobsRef = doc(firestore, "jobs", jobId);
          const querySnapshot = await getDoc(JobsRef);


          setJobs(querySnapshot.data())
          return querySnapshot;
        };

        fetchJobs()
      } catch (error) {
        console.error('Error fetching professors:', error);
      }
    };

    fetchJobs();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1500);
  }, [])

  // const jobId=job.ref.id;
  return <>
    <StuNav />
    <div className="job-details-container">
      {loading ?

        <BeatLoader
          color="#00a2bb"
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
        <div className="job-details-card">

          <h2>{job.postion}</h2>

          <div className="jobcontainer">
            <p>Salary: {job.stipend}</p>
            <p>Status: {job.status}</p>
          </div>
          <p className='duration'>Duration: {job.duration}</p>
          <p className='description'>Description: {job.description}</p>

          <button className="applybtn" onClick={() => { navigate(`/Apply/${jobId}`) }}>Apply</button>
        </div>
      }
    </div>
  </>
};

export default ViewDetails;

