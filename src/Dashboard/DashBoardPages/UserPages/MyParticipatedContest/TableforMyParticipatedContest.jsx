import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import ModalforTaskSubmission from "./ModalforTaskSubmission";

const TableforMyParticipatedContest = ({ data, email }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {

        setIsModalOpen(true);
    };

    const date = moment().format();
    const taskDeadline = data?.contestDeadlineDate; 

    if (email === data.creatorEmail){
        return toast.error('The access is forbidden.')
    }

        if (date > taskDeadline) {
            return toast('The deadline has passed.')
        }

    return (
        <tbody className="capitalize" >

            <tr className="border border-neutral-300">
                <th>{data?.participantTransactionId}</th>
                <td>{data?.contestName}</td>
                <td>{data.contestPostingDate.split('T')[0]}</td>
                <td>{data.contestDeadlineDate.split('T')[0]}</td>
                <td>
                    <button onClick={showModal} className="btn bg-sky-500 text-white hover:bg-sky-400">Task Submission</button>
                    <ModalforTaskSubmission isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={data} />
                </td>



            </tr>

        </tbody >
    );
};

export default TableforMyParticipatedContest;