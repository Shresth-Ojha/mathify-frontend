import { Navigate, useParams } from "react-router-dom"
import { useAuth } from "../store/auth";

const Report = () => {

    //@ts-ignore
    const { user,getReport } = useAuth();
    if (!user) {
        console.log('Not logged in, go to login');
        return <Navigate to="/login" />;
    }

    // const [report, setReport] = 


    // const {reportId} = useParams();






  return (
    <div>Report</div>
  )
}

export default Report