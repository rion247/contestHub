import Footer from "../Footer/Footer";
import AdvertisementSection from "./AdvertisementSection/AdvertisementSection";
import BestContestCreatorSection from "./BestContestCreatorSection/BestContestCreatorSection";
import HeroBanner from "./HeroBanner/HeroBanner";
import PopularContestSection from "./PopularContestSection/PopularContestSection";

const HomePage = () => {
    return (
        <div>
            <HeroBanner />
            <PopularContestSection />
            <AdvertisementSection />
            <BestContestCreatorSection />
            <Footer />
        </div>
    );
};

export default HomePage;