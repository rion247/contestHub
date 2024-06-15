import { Helmet } from "react-helmet";
import Footer from "../Footer/Footer";
import AdvertisementSection from "./AdvertisementSection/AdvertisementSection";
import BestContestCreatorSection from "./BestContestCreatorSection/BestContestCreatorSection";
import HeroBanner from "./HeroBanner/HeroBanner";
import PopularContestSection from "./PopularContestSection/PopularContestSection";
import { useState } from "react";

const HomePage = () => {

    const [search, SetSerach] = useState('');

    return (
        <div>
            <Helmet>
                <title>ContestHUB | Home Page</title>
            </Helmet>
            <HeroBanner SetSerach={SetSerach} />
            <PopularContestSection search={search} />
            <AdvertisementSection />
            <BestContestCreatorSection />
            <Footer />
        </div>
    );
};

export default HomePage;