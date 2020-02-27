import { connect } from "react-redux";
import Summary from "./summary";

mapStateToProps = ({ entities }) => {
    return {
        weather: state.entities,
        transit: state.transit,
        events: state.events
    };
};

export default connect(mapStateToProps)(Summary);