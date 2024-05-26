import {useState,useEffect} from 'react'
import './index.css';
import { doc, collection, query, where, getDocs, getDoc,updateDoc } from "firebase/firestore";
import { firestore } from '../../../services/firebase';
import BeatLoader from "react-spinners/BeatLoader";
import ProfNav from '../profNav/ProfNav';
const Applied=()=>{
    const [applied, setapplied] = useState([]);
    const [loading, setloading] = useState(true);
    const facultyid=localStorage.getItem('uid');
    console.log(facultyid);

    useEffect(() => {
        //fetch candidate data
        // const getjobdata = async (jobid) => {
        //     setloading(true);
        //     const jobDoc = doc(firestore, "jobs", jobid);
        //     const jobSnapshot = await getDoc(jobDoc);
        //     const jobData = jobSnapshot.data();
        //     return jobData;
        // }
        //fetch all pending responses
        const fetchResponse = async () => {
            try {
                // setloading(true);
                const fetchResponse = async () => {

                    const ResponseRef = collection(firestore, "research");
                    const q = query(ResponseRef, where("facultyid", "==", facultyid));
                    const querySnapshot = await getDocs(q);

                    const Response = [];
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.data())
                        const jobdata = doc.data();
                        console.log(jobdata);
                        Response.push(jobdata);
                    });

                    setapplied(Response)

                    return Response;
                };

                fetchResponse()

            } catch (error) {
                console.error('Error fetching professors:', error);
            }
            finally {
                // setloading(false);
            }

        };

        fetchResponse();
    }, []);

    //loading 
    useEffect(() => {
        setloading(true);
        setTimeout(() => {
            setloading(false);
        }, 5000);
    }, [applied])



return<>
<ProfNav/>
<div className='Appliedjob'>
            {loading ?
                <BeatLoader
                    color="#00a2bb"
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                :
                <div className="Appliedjob-container">
                    <h2>Applied</h2>

                    <ul className='subcontainer'>

                        { applied.map((response, index) => (

                            <p key={index} className="eachresponse">
                                
                                <p><strong>Paper Title:</strong> {response.papertitle}</p>
                                <p><strong>Publisher Name:</strong> {response.publisherName}</p>
                                <p><strong>Impact Factor:</strong> {response.impactfactor}</p>
                                <p><strong>Doi:</strong> {response.doi}</p>
                                <p><strong>Status:</strong> <i> {response.status}</i></p>
                                
                                {/* <button onClick={() => { handleAccept(response.responseData.ref.id) }}>Accept</button>
                                <button onClick={() => { handleReject(response.responseData.ref.id) }}>Reject</button> */}
                            </p>
                        )) }

                    </ul>

                </div>
            }
        </div>
</>
}
export default Applied;