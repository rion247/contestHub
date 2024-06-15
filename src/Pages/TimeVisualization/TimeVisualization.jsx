import { Helmet } from "react-helmet";
import Timeline from "./Timeline";

const App = () => {
    return (
        <div>
            <Helmet>
                <title>ContestHUB | Time Visualization Page</title>
            </Helmet>
            <Timeline />
        </div>
    );
};

export default App;
