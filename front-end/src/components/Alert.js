import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert as AddAlert } from "@material-ui/lab";

const Alert = (props) => {
  return (
    <AddAlert severity="error" style={{fontSize: '20px'}}>
      This is an error alert — check it out!
    </AddAlert>
  );
};

// const Alert = ( {alerts}) => alerts!== null && alerts.length > 0 && alerts.map(alert => (
//   <div key={alert.id} className="alert alert-danger">
//     {alert.msg}
//   </div>
// ))

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

//fetch array into this component
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
