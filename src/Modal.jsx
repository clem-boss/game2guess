import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      numberOfSumbits: 1
    }
    this.onClose = this.onClose.bind(this);
  }

  onClose = (event) => {
    this.props.parentCallback(false);
    event.preventDefault();
  }

    render() {
      return (
        <div className='modal is-active'>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="card">
              <div className="card-content">
              <h2 className="title">{this.state.title}</h2>
              <p className='content'>
              Indices: {this.props.hints}<br></br>
                Réponses: {this.props.responses}
              </p>
              </div>
              </div>
          </div>
          <button onClick={this.onClose} className="modal-close is-large" aria-label="close"></button>
        </div>
      );
    }
  }

  export default Modal;