import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./index.css"
import { doc, collection, query, where, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../../../services/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from "react-spinners/BeatLoader";


const FacultyResearch = () => {
    const [researches, setresearches] = useState([]);
    const [loading, setloading] = useState(true);
    const { facultyid } = useParams();

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
        //fetch all pending researches
        const fetchResponse = async () => {
            try {
                // setloading(true);
                const fetchResponse = async (facultyid) => {

                    const ResponseRef = collection(firestore, "research");
                    const q = query(ResponseRef, where("facultyid", "==", facultyid), where("status", "==", "pending"));
                    const querySnapshot = await getDocs(q);

                    const Response = [];
                    querySnapshot.forEach(async (doc) => {
                        console.log(doc.data())
                        // const userid = doc.data().userId;
                        Response.push(doc.data());
                        // const userData = await getUserdata(userid);
                        // const combinedData = { userData, responseData: doc };
                        // console.log(combinedData);
                        // Response.push(combinedData);
                    });

                    setresearches(Response)

                    return Response;
                };

                fetchResponse(facultyid)

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
    }, [researches])



    //accept
    const handleAccept = async (responseid) => {
        try {
            await updateDoc(doc(firestore, "response", responseid), {              // to save user credentials in database
                status: "accepted"
            });
            toast.success("Accepted Application", { position: "top-center" });
        } catch (error) {
            console.error(error);
            toast.success(error.msg, { position: "bottom-corner" });
        }

    }
    //reject
    const handleReject = async (responseid) => {
        try {
            await updateDoc(doc(firestore, "response", responseid), {              // to save user credentials in database
                status: "rejected"
            });
            toast.success("Rejected Application", { position: "top-center" });
        } catch (error) {
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
                    <h2>Researches</h2>

                    <ul className='subcontainer'>

                        {!loading && researches.length !== 0 ? researches.map((response, index) => (

                            <p key={index} className="eachresponse">
                                <h3>Reponse {index + 1}</h3>
                                <p><strong>Paper Title:</strong> {response.papertitle}</p>
                                <p><strong>DOI:</strong> <a href={response.doi} target="_blank" rel="noopener noreferrer">{response.doi}</a></p>
                                <p><strong>IGDTUW Author Name:</strong> {response.igdtuwAuthorName}</p>
                                <p><strong>IGDTUW Authors:</strong> {response.igdtuwAuthors}</p>
                                <p><strong>Impact Factor:</strong> {response.impactfactor}</p>
                                <p><strong>Indexing:</strong> {response.indexing}</p>
                                <p><strong>Issue:</strong> {response.issue}</p>
                                <p><strong>Journal Name:</strong> {response.journalname}</p>
                                <p><strong>Page No:</strong> {response.pageno}</p>
                                
                                <p><strong>Publisher Name:</strong> {response.publisherName}</p>
                                <p><strong>Status:</strong> {response.status}</p>
                                <p><strong>Total Authors:</strong> {response.totalauthors}</p>
                                <p><strong>Volume:</strong> {response.volume}</p>
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