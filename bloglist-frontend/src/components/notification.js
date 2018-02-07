import React, { Component } from "react";
import PropTypes from "prop-types";

class Notification extends Component {
  render() {
    if (this.props.notification === null) {
      return null;
    }

    return (
      <div
        style={{
          borderColor:
            this.props.notification.style === "SUCCESS" ? "green" : "red",
          borderStyle: "solid"
        }}
      >
        <p>{this.props.notification.message}</p>
      </div>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.object
};

export default Notification;
