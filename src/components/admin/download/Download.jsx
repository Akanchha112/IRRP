import { useEffect, useState ,useRef} from 'react';
import { doc, collection, query, where, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../../../services/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from "react-spinners/BeatLoader";
import "./index.css";
import { useReactToPrint } from 'react-to-print';

const Download=()=>{
    const [research, setResearches] = useState([]);
    const [loading, setLoading] = useState(true);
    const componentPDF=useRef();
    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const responseRef = collection(firestore, "research");
                const q = query(responseRef, where("status", "==", "accepted"));
                const querySnapshot = await getDocs(q);

                const response = querySnapshot.docs.map((docSnapshot) => ({
                    id: docSnapshot.id,
                    ...docSnapshot.data()
                }));

                setResearches(response);
            } catch (error) {
                console.error('Error fetching research:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResponse();
    }, []);

    const generatePDF=useReactToPrint({
        content:()=>componentPDF.current,
        documentTitle:"Research data",
        onAfterPrint:()=>{toast.success("Downloaded", { position: "top-center" });}
    })


    return (
        <>
            <div className='download'>
                {loading ? (
                    <BeatLoader
                        color="#1E4D0F"
                        loading={loading}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                ) : (
                    <div className="download-container">
                        <h2>Research</h2>
                            <div ref={componentPDF} style={{width:"100%"}}>
                            <table className="download-table">
                                <thead>
                                    <tr>
                                        <th>Index</th>
                                        <th>Paper Title</th>
                                        <th>DOI</th>
                                        <th>IGDTUW Author Name</th>
                                        <th>IGDTUW Authors</th>
                                        <th>Impact Factor</th>
                                        <th>Indexing</th>
                                        <th>Issue</th>
                                        <th>Journal Name</th>
                                        <th>Page No</th>
                                        <th>Publisher Name</th>
                                        <th>Status</th>
                                        <th>Total Authors</th>
                                        <th>Volume</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {research.map((response, index) => (
                                        <tr key={response.id}>
                                            <td>{index + 1}</td>
                                            <td>{response.papertitle}</td>
                                            <td><a href={response.doi} target="_blank" rel="noopener noreferrer">{response.doi}</a></td>
                                            <td>{response.igdtuwAuthorName}</td>
                                            <td>{response.igdtuwAuthors}</td>
                                            <td>{response.impactfactor}</td>
                                            <td>{response.indexing}</td>
                                            <td>{response.issue}</td>
                                            <td>{response.journalname}</td>
                                            <td>{response.pageno}</td>
                                            <td>{response.publisherName}</td>
                                            <td>{response.status}</td>
                                            <td>{response.totalauthors}</td>
                                            <td>{response.volume}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                        </div>
                        <div >
                            <button onClick={generatePDF} id="downloadbtn">Download</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );

}

export default Download;