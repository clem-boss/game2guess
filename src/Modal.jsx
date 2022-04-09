import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      numberOfImages: this.props.numberOfImages,
      numberOfSumbits: 1
    }
    this.onClose = this.onClose.bind(this);
  }

  onClose = (event) => {
    this.props.parentCallback(false);
    event.preventDefault();
  }

    render() {
      const hints = [];

      for (let i = 0; i < this.state.numberOfImages; i++) {
        hints.push(<span>🟨</span>)
      }
      for (let i = 0; i < (4 - this.state.numberOfImages); i++) {
        hints.push(<span>⬛</span>)
      }

      return (
        <div className='modal is-active'>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="card">
              <h2 className="title">{this.state.title}</h2>
              Indices : {hints}
            </div>
          </div>
          <button onClick={this.onClose} className="modal-close is-large" aria-label="close"></button>
        </div>
      );
    }
  }

  export default Modal;