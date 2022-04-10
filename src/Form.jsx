import React from 'react';
import Modal from './Modal'
import './Form.css'

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: this.props.goal,
      value: '',
      remainingSubmits: 10,
      isModalActive: false,
      modalTitle: '',
      inputClass: "text-input has-background-black-bis input has-text-white-bis",
      responses: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalState = this.toggleModalState.bind(this);
  }

  displayErrorInput() {
    this.setState({inputClass: this.state.inputClass += ' is-danger'});
    setTimeout(() => {this.setState({inputClass: this.state.inputClass.replace('is-danger', '')})}, 300);
  }

  toggleModalState(state) {
    this.setState({isModalActive: state});
    this.forceUpdate();
  }

   handleSubmit(event) {
    if (this.state.value.toLowerCase() === this.props.goal.toLowerCase()) {
      event.preventDefault();
      this.setState({modalTitle: 'Et oui !'})
      this.toggleModalState(true);
    } else {
      event.preventDefault();

      if (this.state.remainingSubmits > 1 && this.state.value !== "") {
        this.displayErrorInput();
        this.setState({remainingSubmits: this.state.remainingSubmits - 1});
      }
      if (this.state.remainingSubmits === 1) {
        this.setState({modalTitle: 'Et flûte ...'})
        this.toggleModalState(true);
      }
    }
    this.makeResponsesGauge();
  } 

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  makeResponsesGauge() {
    let responses = [];
    let red = 11 - this.state.remainingSubmits;
    for (let i = 1; i <= red; i++) {
      i === red && i !== 10 ? responses.push(<span>✔️</span>) : responses.push(<span>❌</span>);
    }
    this.setState({responses: responses});
  }

    render() {
      return (
        <>
          <form onSubmit={this.handleSubmit}>
          <input value={this.state.value} onChange={this.handleChange} className={this.state.inputClass} type="text" id="lname" name="gameTitle" placeholder="Titre d'un jeu"></input>
          <br></br>
          <p className="tooltip"><strong>{this.state.remainingSubmits}</strong> essais restants</p>
          <input className="button is-primary" type="submit" value="Envoyer"></input>
          </form>
           {this.state.isModalActive ? <Modal responses={this.state.responses} hints={this.props.hints} title={this.state.modalTitle} /> : null}   
        </>

      );
    }
  }

  export default Form;