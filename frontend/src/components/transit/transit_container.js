import { connect } from "react-redux";
import Transit from "./transit";

const mapStateToProps = ({entities : { settings } }) => {
  return {
    settings: {
      homeAddress: "21456 Holly Oak Dr Cupertino, CA 95014",
      workAddress: "4855 Atherton Ave San Jose, CA 95130"
    }
  };
};

const mapdispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps, 
  mapdispatchToProps
)(Transit);