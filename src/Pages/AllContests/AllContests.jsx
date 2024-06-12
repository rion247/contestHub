import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Container from "../../components/Shared/Container";
import { toast } from 'react-toastify';
import LoadingSpinner from './../../LoadingSpinner/LoadingSpinner';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import AllContestTab from './AllContestTab';
import ImageDesignContests from './ImageDesignContests';
import ArticleWriting from './ArticleWriting';
import MarketingStrategy from './MarketingStrategy';
import DigitalAdvertisementContests from './DigitalAdvertisementContests';
import GamingReviewContestData from './GamingReviewContestData';
import MovieReview from './MovieReview';
import BusinessIdeaConcertsContestData from './BusinessIdeaConcertsContestData';
import BookReview from './BookReview';

const AllContests = () => {

    const axiosPublic = useAxiosPublic();

    const { isPending, error, data: contestData = [0] } = useQuery({
        queryKey: ['contestsData'],
        queryFn: async () => {
            const { data } = await axiosPublic('/contestData');
            return data;
        }
    })

    // console.log(contestData)

    if (isPending) return <LoadingSpinner />

    if (error) return toast.error(error.message);

    const acceptedContestData = contestData.filter(data => data.contestStatus === 'accepted');
    const acceptedContestDataWithParticiaptionCount = acceptedContestData.sort((a, b) => (b.participantCount - a.participantCount));
    const imageDesignContestData = acceptedContestDataWithParticiaptionCount.filter(data => data.contestTypeTags === 'imageDesignContests')
    const articleWritingContestData = acceptedContestDataWithParticiaptionCount.filter(data => data.contestTypeTags === 'articleWriting')
    const marketingStrategyContestData = acceptedContestDataWithParticiaptionCount.filter(data => data.contestTypeTags === 'marketingStrategy')
    const digitalAdvertisementContestData = acceptedContestDataWithParticiaptionCount.filter(data => data.contestTypeTags === 'digitalAdvertisementContests')
    const gamingReviewContestData = acceptedContestDataWithParticiaptionCount.filter(data => data.contestTypeTags === 'gamingReview')
    const bookReviewContestData = acceptedContestDataWithParticiaptionCount.filter(data => data.contestTypeTags === 'bookReview')
    const businessIdeaConcertsContestData = acceptedContestDataWithParticiaptionCount.filter(data => data.contestTypeTags === 'businessIdeaConcerts')
    const movieReviewContestData = acceptedContestDataWithParticiaptionCount.filter(data => data.contestTypeTags === 'movieReview')

    return (
        <Container>
            <Tabs>
                <TabList>
                    <Tab>All Contests</Tab>
                    <Tab>Image Design Contests</Tab>
                    <Tab>Article Writing</Tab>
                    <Tab>Marketing Strategy</Tab>
                    <Tab>Digital Advertisement Contests</Tab>
                    <Tab>Gaming Review</Tab>
                    <Tab>Book Review</Tab>
                    <Tab>Business Idea Concerts</Tab>
                    <Tab>Movie Review</Tab>
                </TabList>

                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 my-8 md:my-10 lg:my-12 xl:my-16' >
                        {
                            acceptedContestDataWithParticiaptionCount.map(item => <AllContestTab key={item._id} item={item} />)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 my-8 md:my-10 lg:my-12 xl:my-16'>

                        {
                            imageDesignContestData.map(item => <ImageDesignContests key={item._id} item={item} />)
                        }

                    </div>

                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 my-8 md:my-10 lg:my-12 xl:my-16'>
                        {
                            articleWritingContestData.map(item => <ArticleWriting key={item._id} item={item} />)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 my-8 md:my-10 lg:my-12 xl:my-16'>
                        {
                            marketingStrategyContestData.map(item => <MarketingStrategy key={item._id} item={item} />)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 my-8 md:my-10 lg:my-12 xl:my-16'>
                        {
                            digitalAdvertisementContestData.map(item => <DigitalAdvertisementContests key={item._id} item={item} />)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 my-8 md:my-10 lg:my-12 xl:my-16'>
                        {
                            gamingReviewContestData.map(item => <GamingReviewContestData key={item._id} item={item} />)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 my-8 md:my-10 lg:my-12 xl:my-16'>
                        {
                            bookReviewContestData.map(item => <BookReview key={item._id} item={item} />)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 my-8 md:my-10 lg:my-12 xl:my-16'>
                        {
                            businessIdeaConcertsContestData.map(item => <BusinessIdeaConcertsContestData key={item._id} item={item} />)
                        }
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 my-8 md:my-10 lg:my-12 xl:my-16'>
                        {
                            movieReviewContestData.map(item => <MovieReview key={item._id} item={item} />)
                        }
                    </div>
                </TabPanel>

            </Tabs>

        </Container >
    );
};

export default AllContests;