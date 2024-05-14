import './index.css';
import { useEffect, useState } from 'react';
import { auth, firestore } from '../../../services/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import BeatLoader from "react-spinners/BeatLoader";

const GetFaculty = () => {
    const [professor, setProfessors] = useState([]);
    const instituteId = localStorage.getItem('uid'); // Replace with your institute ID
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const fetchProfessors = async (instituteId) => {
                    const professorsRef = collection(firestore, "users");
                    const q = query(professorsRef, where("role", "==", "professor"), where("institueid", "==", instituteId));
                    const querySnapshot = await getDocs(q);

                    const professors = [];
                    querySnapshot.forEach((doc) => {
                        professors.push(doc.data());
                    });
                    setProfessors(professors)
                    return professors;
                };

                fetchProfessors(instituteId).then((professors) => {
                    console.log("Professors:", professors);
                });
                // setProfessors(professorsData);
            } catch (error) {
                console.error('Error fetching professors:', error);
            }
        };

        fetchProfessors();
    }, [instituteId]);

    useEffect(() => {
        setTimeout(() => {
            setloading(false);
        }, 2000);
    }, [])

    return (
        <div className='istituteprofessors'>
            {loading ?

                <BeatLoader
                    color="#00a2bb"
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                :
                <div className="istituteprofessors-container">
                    <h2>Professors</h2>
                    <ul className='subcontainer'>
                        {professor.map((Professor, index) => (

                            <p key={index} className="eachprof">
                                <h3>Professor {index+1}</h3>
                                <p>{Professor.name?Professor.name:<></>}     <i>{Professor.qualification?Professor.qualification:<></>}</i> </p>
                                <p>Email: {Professor.email}</p>
                            </p>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
}
export default GetFaculty;