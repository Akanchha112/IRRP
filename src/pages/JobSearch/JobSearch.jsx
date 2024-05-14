import './JobSearch.css';
import StuNav from '../../components/student/studentNav/StuNav';
import React, { useState, useEffect,CSSProperties } from 'react';
import { firestore } from '../../services/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
// import search from '../../components/img/search.jpg';
import { useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";

const override: CSSProperties = {
  margin: "0 auto",
  position:"absolute",
  left:"50%"
};



const JobSearch = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const ViewDetails = (jobId) => {
    navigate(`/ViewDetails/${jobId}`);
  }
  const [searchQuery, setSearchQuery] = useState('');

  const [cards, setCards] = useState([]);
  //fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchJobs = async () => {
          const JobsRef = collection(firestore, "jobs");
          const q = query(JobsRef, where("status", "==", "open"));
          const querySnapshot = await getDocs(q);

          const jobs = [];
          querySnapshot.forEach((doc) => {

            jobs.push(doc);
          });//doc.data(),doc.ref.id
          // console.log(jobs)
          setCards(jobs)
          return jobs;
        };

        fetchJobs().then((job) => {
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

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // const title=cards.data().postion;
  const filteredCards = cards.filter((card) =>
    card.data().postion.toLowerCase().includes(searchQuery.toLowerCase())

  );

  return <>
    <StuNav />
    <div className='JobSearch-Main'></div>
    <div className="JobSearch">
      <div className='search'>
        {/* <img src={search} className='searchIcon' alt=""/> */}
        <input
          type="text"
          placeholder="Search for new opportunities "
          id='searchBar'
          value={searchQuery}
          onChange={handleSearchInputChange}

        />

      </div>
      {loading ?

        <BeatLoader
          color="#00a2bb"
          loading={loading}
          cssOverride={override}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
        <div className="card-container" id="card-container">

          {filteredCards.map((job) => (
            <div key={job.ref.id} className="card" id="card">
              <h2 className='Jobtitle'>{job.data().postion}</h2>

              <p className='salary'>${job.data().stipend}</p>

              <div className='JobstatusDiv'>
                <label className='status'>Status:</label>
                <p className='Jobstatus'>{job.data().status}</p>
                <button onClick={() => { ViewDetails(job.ref.id) }}>View Details</button>
              </div>


            </div>
          ))}
        </div>
      }
      
    </div>
  </>
};

export default JobSearch;