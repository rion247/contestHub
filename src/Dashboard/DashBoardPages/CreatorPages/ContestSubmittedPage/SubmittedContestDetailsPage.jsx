
import { useLoaderData } from 'react-router-dom';
import TableforSubmittedContestDetailsPage from './TableforSubmittedContestDetailsPage';
import Container from './../../../../components/Shared/Container';
import { Helmet } from 'react-helmet';
const SubmittedContestDetailsPage = () => {

    const submittedContestData = useLoaderData();

    console.log(submittedContestData)

    return (

        <Container>
            <Helmet>
                <title>ContestHUB | Submitted Details</title>
            </Helmet>
            <div className="overflow-x-auto h-auto mt-12 flex items-center">

                <table className="table">
                    <thead>
                        <tr>
                            <th>Contest Name</th>
                            <th>Participant Name</th>
                            <th>Participant Email</th>
                            <th>Submitted Task</th>
                            <th></th>
                        </tr>
                    </thead>

                    {
                        submittedContestData.filter(item => item.submittedTaskLink !== null && item.submittedTaskLink !== '').map(data => <TableforSubmittedContestDetailsPage key={data._id} data={data} />)
                    }

                </table>

            </div>
        </Container>

    );
};

export default SubmittedContestDetailsPage;