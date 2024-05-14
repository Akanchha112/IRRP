import { useParams } from 'react-router-dom';
import GetRes from '../../../components/admin/getFacultyResearch/FacultyResearch';
import ProfNav from '../../../components/faculty/profNav/ProfNav';
const ViewResponse = () => {
  const { jobId } = useParams();

  // Use jobId to fetch data related to the job

  return (
    <>
    <ProfNav />
    <GetRes props={jobId} />
    </>
  );
};

export default ViewResponse;