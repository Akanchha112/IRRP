import './index.css';
import { useEffect, useState } from 'react';
import { auth, firestore } from '../../../services/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import BeatLoader from "react-spinners/BeatLoader";

const GetFaculty = () => {
    const [faculty, setfaculty] = useState([]);
    const instituteId = localStorage.getItem('uid'); // Replace with your institute ID
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchfaculty = async () => {
            try {
                const fetchfaculty = async () => {
                    const facultyRef = collection(firestore, "users");
                    const q = query(facultyRef, where("role", "==", "faculty"));
                    const querySnapshot = await getDocs(q);

                    const faculty = [];
                    querySnapshot.forEach((doc) => {
                        faculty.push(doc.data());
                    });
                    setfaculty(faculty)
                    return faculty;
                };

                fetchfaculty().then((faculty) => {
                    console.log("faculty:", faculty);
                });
                // setfaculty(facultyData);
            } catch (error) {
                console.error('Error fetching faculty:', error);
            }
        };

        fetchfaculty();
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
                    <h2>Faculty</h2>
                    <ul className='subcontainer'>
                        {faculty.map((Faculty, index) => (

                            <p key={index} className="eachprof">
                                <h3>Faculty {index+1}</h3>
                                <p>{Faculty.name?Faculty.name:<></>}     <i>{Faculty.qualification?Faculty.qualification:<></>}</i> </p>
                                <p>Email: {Faculty.email}</p>
                            </p>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
}
export default GetFaculty;