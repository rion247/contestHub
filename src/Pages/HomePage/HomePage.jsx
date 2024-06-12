import AdvertisementSection from "./AdvertisementSection/AdvertisementSection";
import HeroBanner from "./HeroBanner/HeroBanner";
import PopularContestSection from "./PopularContestSection/PopularContestSection";

const HomePage = () => {
    return (
        <div>
            <HeroBanner />
            <PopularContestSection />
            <AdvertisementSection />
        </div>
    );
};

export default HomePage;