import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from './Modal';

class ButtonModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        title: null,
        content: null
      }
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  }

  render() {
    return (
      <Modal isActive={this.props.isModalActive} handleClose={this.props.handleCloseModal}>
        <div className={"ask-question"}>
          <h3 className={"ask-question__title"}>Create a Course</h3>
          <form>
            <div className={"ask-question__field"}>
              <div className={"ask-question__field-title"}>Title</div>
              <input className={"common__input"} type={"text"} name={"title"} onChange={this.handleInputChange}/>
            </div>

            <div className={"ask-question__field"}>
              <div className={"ask-question__field-title"}>Body</div>
              <textarea className={"common__input common__textarea"} name={"content"} onChange={this.handleInputChange}/>
            </div>

            <div className={"common__button"}>Create a Course</div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default connect(state => state)(ButtonModal)

