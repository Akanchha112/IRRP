import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./index.css"
import { doc, collection, query, where, getDocs,  updateDoc } from "firebase/firestore";
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
                        console.log(doc.ref.id)
                        // const userid = doc.data().userId;
                        Response.push(doc);
                        
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
    const handleAccept = async (researchid) => {
        try {
            await updateDoc(doc(firestore, "research", researchid), {              // to save user credentials in database
                status: "accepted"
            });
            toast.success("Accepted Research", { position: "top-center" });
        } catch (error) {
            console.error(error);
            toast.success(error.msg, { position: "bottom-corner" });
        }

    }
    //reject
    const handleReject = async (researchid) => {
        try {
            await updateDoc(doc(firestore, "research", researchid), {              // to save user credentials in database
                status: "rejected"
            });
            toast.success("Rejected Research", { position: "top-center" });
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
                                <h3>Research {index + 1}</h3>
                                <p><strong>Paper Title:</strong> {response.data().papertitle}</p>
                                <p><strong>DOI:</strong> <a href={response.data().doi} target="_blank" rel="noopener noreferrer">{response.data().doi}</a></p>
                                <p><strong>IGDTUW Author Name:</strong> {response.data().igdtuwAuthorName}</p>
                                <p><strong>IGDTUW Authors:</strong> {response.data().igdtuwAuthorNames.join(', ')}</p>
                                <p><strong>Impact Factor:</strong> {response.data().impactfactor}</p>
                                <p><strong>Indexing:</strong> {response.data().indexing}</p>
                                <p><strong>Issue:</strong> {response.data().issue}</p>
                                <p><strong>Journal Name:</strong> {response.data().journalname}</p>
                                <p><strong>Page No:</strong> {response.data().pageno}</p>
                                
                                <p><strong>Publisher Name:</strong> {response.data().publisherName}</p>
                                <p><strong>Status:</strong> {response.data().status}</p>
                                <p><strong>Total Authors:</strong> {response.data().totalauthors}</p>
                                <p><strong>Volume:</strong> {response.data().volume}</p>
                                <button onClick={() => { handleAccept(response.ref.id) }}>Accept</button>
                                <button onClick={() => { handleReject(response.ref.id) }}>Reject</button>
                            </p>
                        )) : <h3>No Response received yet</h3>}

                    </ul>

                </div>
            }
        </div>
    );
};

export default FacultyResearch;