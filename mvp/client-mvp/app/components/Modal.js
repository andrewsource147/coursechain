import React, { Component } from "react";
import { connect } from "react-redux";

class Modal extends Component {
  render() {
    return (
      <div className={"modal-overlay" + (this.props.isActive ? " modal-overlay--active" : "")}>
        <div className={"modal" + (this.props.isActive ? " modal--active" : "")}>
          <div className={"modal__content"}>
            {this.props.children}
            <div className={"modal__close-btn"} onClick={this.props.handleClose}>&times;</div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Modal)
