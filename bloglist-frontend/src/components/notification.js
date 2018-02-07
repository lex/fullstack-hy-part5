import React, { Component } from "react";

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

export default Notification;
