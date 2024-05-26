import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./index.css"
import { doc, collection, query, where, getDocs, getDoc,updateDoc } from "firebase/firestore";
import { firestore } from '../../../services/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from "react-spinners/BeatLoader";


const FacultyResearch = () => {
    const [responses, setresponses] = useState([]);
    const [loading, setloading] = useState(true);
    const { jobId } = useParams();

    // Use jobId to fetch data related to the job
    useEffect(() => {
        //fetch candidate data
        const getUserdata = async (userid) => {
            setloading(true);
            const userDoc = doc(firestore, "users", userid);
            const userSnapshot = await getDoc(userDoc);
            const userData = userSnapshot.data();
            return userData;
        }
        //fetch all pending responses
        const fetchResponse = async () => {
            try {
                // setloading(true);
                const fetchResponse = async (jobId) => {

                    const ResponseRef = collection(firestore, "response");
                    const q = query(ResponseRef, where("jobId", "==", jobId), where("status", "==", "pending"));
                    const querySnapshot = await getDocs(q);

                    const Response = [];
                    querySnapshot.forEach(async (doc) => {
                        // console.log(doc.data())
                        const userid = doc.data().userId;
                        const userData = await getUserdata(userid);
                        const combinedData = { userData, responseData: doc };
                        console.log(combinedData);
                        Response.push(combinedData);
                    });

                    setresponses(Response)

                    return Response;
                };

                fetchResponse(jobId)

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
    }, [responses])



    //accept
    const handleAccept=async(responseid)=>{
        try{
            await updateDoc(doc(firestore, "response", responseid), {              // to save user credentials in database
                status:"accepted"
            });
            toast.success("Accepted Application", { position: "top-center" });
        }catch (error) {
            console.error(error);
            toast.success(error.msg, { position: "bottom-corner" });
          }
        
    }
    //reject
    const handleReject=async(responseid)=>{
        try{
            await updateDoc(doc(firestore, "response", responseid), {              // to save user credentials in database
                status:"rejected"
              });
              toast.success("Rejected Application", { position: "top-center" });
        }catch (error) {
            console.error(error);
            toast.success(error.msg, { position: "bottom-corner" });
          }
        
    }



    return (
        <div className='professorsResponse'>
            {loading ?
                <BeatLoader
                    color="#1E4D0F"
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                :
                <div className="professorsResponse-container">
                    <h2>Responses</h2>

                    <ul className='subcontainer'>

                        {!loading && responses.length !== 0 ? responses.map((response, index) => (

                            <p key={index} className="eachresponse">
                                <h3>Reponse {index+1}</h3>
                                <p><strong>Name:</strong> {response.userData.name}</p>
                                <p><strong>Email:</strong> {response.userData.email}</p>
                                <p><strong>Question 1:</strong> {response.responseData.data().questoin1}</p>
                                <p><strong>Answer 1:</strong> {response.responseData.data().answer1}</p>
                                <p><strong>Question 2:</strong> {response.responseData.data().question2}</p>
                                <p><strong>Answer 2:</strong> {response.responseData.data().answer2}</p>
                                <button onClick={() => { handleAccept(response.responseData.ref.id) }}>Accept</button>
                                <button onClick={() => { handleReject(response.responseData.ref.id) }}>Reject</button>
                            </p>
                        )) : <h3>No Response received yet</h3>}

                    </ul>

                </div>
            }
        </div>
    );
};

export default FacultyResearch;