import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaTrophy } from 'react-icons/fa';
import moment from 'moment';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';

const Timeline = () => {
  const axiosPublic = useAxiosPublic();

  const { isPending, error, data: contests = [0] } = useQuery({
    queryKey: ['contestsData'],
    queryFn: async () => {
      const { data } = await axiosPublic('/contestData');
      return data;
    }
  })

  if (isPending) return <LoadingSpinner />

  if (error) return toast.error(error.message);

  return (
    <VerticalTimeline>
      {contests.map((contest) => (
        <VerticalTimelineElement
          key={contest._id}
          date={`${moment(contest.contestPostingDate).format('MMM DD, YYYY')} - ${moment(contest.contestDeadlineDate).format('MMM DD, YYYY')}`}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<FaTrophy />}
        >
          <h3 className="vertical-timeline-element-title">{contest.contestName}</h3>
          <img src={contest.contestImageURL} alt={contest.contestName} style={{ width: '100%' }} />
          <p>{contest.contestDescription}</p>
          <p><strong>Prize Money:</strong> ${contest.prizeMoney}</p>
          <p><strong>Category:</strong> {contest.contestContestCategory}</p>
          <p><strong>Creator:</strong> {contest.creatorName}</p>
          {contest.winnerEmail && <p><strong>Winner:</strong> {contest.winnerEmail}</p>}
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default Timeline;
