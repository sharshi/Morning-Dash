import { connect } from "react-redux";
import Summary from "./summary";

const mapStateToProps = ({ entities }) => {
    debugger
    return {
        weather: entities.weather,
        transit: entities.transit,
        events: entities.events
    };
};

export default connect(mapStateToProps)(Summary);