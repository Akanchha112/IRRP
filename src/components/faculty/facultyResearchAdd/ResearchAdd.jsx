
import { useState } from 'react';
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from '../../../services/firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from "react-spinners/BeatLoader";
import './index.css';

const ResearchAdd = () => {
    const [papertitle, setPapertitle] = useState('');
    const [journalname, setJournalname] = useState('');
    const [publisherName, setPublisherName] = useState('');
    const [volume, setVolume] = useState('');
    const [issue, setIssue] = useState('');
    const [pageno, setPageno] = useState(false);
    const [date,setDate] = useState('');
    const [doi,setDoi] = useState('');
    const [indexing,setIndexing] = useState('');
    const [impactfactor, ] = useState('');
    const [totalauthors,] = useState('');
    const [igdtuwAuthors,] = useState('');
    const [igdtuwAuthorName,] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setloading] = useState(false);
    const handleAdd = async (e) => {
        e.preventDefault();
        setloading(true);
        const profid = localStorage.getItem('uid');
        const job = {
            papertitle: papertitle,
            journalname: journalname,
            publisherName: publisherName,
            volume: volume,
            issue: issue,
            pageno: pageno,
            date: date,
            doi: doi,
            indexing: indexing,
            impactfactor: impactfactor,
            totalauthors: totalauthors,
            igdtuwAuthors: igdtuwAuthors,
            igdtuwAuthorName: igdtuwAuthorName
        }
        try {
            const newJobRef = doc(collection(firestore, "research"));
            await setDoc(newJobRef, job);

            toast.success("Added Successfully", { position: "top-center" });
            setPapertitle('');
            setJournalname('');
            setPublisherName('');
            setVolume('');
            setIssue('');
            setPageno('');
            setDate('');
            setDoi('');
            setIndexing('');
            setImpactfactor('');
            setTotalAuthors('');
            setIgdtuwAuthors('');
            setIgdtuwAuthorName('');    
            setIsChecked(false);
            setloading(false);

        } catch (error) {
            console.error(error);
            toast.error(error.message, { position: "bottom-center" });
        }       
        setloading(false);
    }
    return <>
        <div className="addJobContainer">
            {loading ?
                <BeatLoader
                    color="#00a2bb"
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                :
                <div className="subcontainerJob">
                    <h1>Add Research</h1>
                    <form onSubmit={handleAdd}>
                        <div>
                            <div>
                                <label>Paper Title</label>
                                <input type="text" value={papertitle} onChange={(e) => setPapertitle(e.target.value)} placeholder='Enter Paper Title' required />
                            </div>
                            <div>
                                <label>Name of the Journal</label>
                                <input type="text" value={journalname} onChange={(e) =>  setJournalname(e.target.value)} placeholder='Enter Name of the Journal' required />
                            </div>
                            <div>
                                <label>Publisher Name</label>
                                <input type="text" value={publisherName} onChange={(e) =>setPublisherName(e.target.value)} placeholder='Enter Publisher Name' required />
                            </div>
                            <div>
                                <label>Volume</label>
                                <input type="text" value={volume} onChange={(e) => setVolume(e.target.value)} placeholder='Enter Volume' required />
                            </div>
                            <div>
                                <label>Issue </label>
                                <input type="text" value={issue} onChange={(e) => setIssue(e.target.value)} placeholder='Enter Issue ' required />
                            </div>
                            <div>
                                <label>Page Number</label>
                                <input type="number" value={pageno} onChange={(e) => setPageno(e.target.value)} placeholder='Enter Page Number' required />
                            </div>
                            <div>
                                <label>Published Date</label>
                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder='Published Date' required />
                            </div>
                            <div>
                                <label>DOI</label>
                                <input type="text" value={doi}  onChange={(e) => setDoi(e.target.value)} placeholder='Enter DOI' required />
                            </div>
                
                            <div>
                                <label>Indexing</label>
                                <input type="text" value={indexing} onChange={(e) => setIndexing(e.target.value)} placeholder='Enter Indexing' required />
                            </div>
                            <div>
                                <label>Impact Factor</label>
                                <input type="text" value={impactfactor} onChange={(e) => setImpactfactor(e.target.value)} placeholder='Impact Factor' required />
                            </div>
                            <div>
                                <label>Total Number of Authors</label>
                                <input type="number" value={totalauthors}  onChange={(e) => setTotalAuthors(e.target.value)} placeholder='Total Number of Authors' required />
                            </div>
                            <div>
                                <label>Number of IGDTUW Authors</label>
                                <input type="number" value={igdtuwAuthors}  onChange={(e) => setIgdtuwAuthors(e.target.value)} placeholder='Number of IGDTUW Authors' required />
                            </div>
                            <div>
                                <label>Name of IGDTUW Authors</label>
                                <input type="text" value={igdtuwAuthorName}  onChange={(e) => setIgdtuwAuthorName(e.target.value)} placeholder='Name of IGDTUW Authors' required />
                            </div>
                            <div>
                            <label>
                                <input type="checkbox" value={isChecked} onChange={() => setIsChecked(!isChecked)} required /> I have rechecked all the details</label>
                            </div>
                            <div>
                                <button type="submit">Add</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
            }
        </div>
    </>
}
export default ResearchAdd;