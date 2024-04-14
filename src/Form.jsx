import { getIGDBSuggestionsByGameName } from "./services/igdb.service.ts";
import React from 'react'
import Modal from './Modal'
import './Form.css'

class Form extends React.Component {
  serverDomain = process.env.GAME2GUESS_SERVER_DOMAIN || "";

  constructor(props) {
    super(props);

    this.state = {
      goal: this.props.goal,
      value: '',
      remainingSubmits: 10,
      isModalActive: false,
      modalTitle: '',
      inputClass: "text-input has-background-black-bis input has-text-white-bis",
      responses: [],
      suggestions: [],
      isInputFocused: false,
    }
    this.handleChange = this.handleTextInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalState = this.toggleModalState.bind(this);
    this.onSelectTitle = this.onSelectTitle.bind(this);
  }


  onSelectTitle(title) {
    this.setState({value: title});
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

  handleTextInputChange(event) {
    const value = event.target.value;
    this.setState({value});

    getIGDBSuggestionsByGameName(value)
      .then(suggestions => {
        this.setState({apiResults: suggestions})
      });
  }

  makeResponsesGauge() {
    let responses = [];
    let red = 11 - this.state.remainingSubmits;
    for (let i = 1; i <= red; i++) {
      i === red && i !== 10 ? responses.push(<span>✔️</span>) : responses.push(<span>❌</span>);
    }
    this.setState({responses: responses});
  }

  UnFocus() {
    this.setState({isInputFocused: false})
  }


    render() {
      return (
        <>
          <form className="game-form" autoComplete="off" onSubmit={this.handleSubmit}>
          <input  onFocus={(e) => {
                    this.setState({isInputFocused: true});
                  }}
                  onBlur={(e) => {
                    setTimeout(this.UnFocus.bind(this), 500);
                  }}
                  value={this.state.value} 
                  onChange={this.handleTextInputChange} 
                  className={this.state.inputClass} 
                  type="text" 
                  id="lname" 
                  name="gameTitle" 
                  placeholder="Titre d'un jeu"></input>
          <div className={this.state.isInputFocused && this.state.apiResults.length ? "dropdown-menu active" : "dropdown-menu"} id="dropdown-menu">
            <div className="dropdown-content has-background-black-ter">
              {this.state.apiResults?.map((result) =>
                <div onClick={() => {this.onSelectTitle(result.name)}} className="dropdown-item has-text-white-ter">
                {result.name}
                </div>
              )}
            </div>
          </div>
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