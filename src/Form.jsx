// @ts-nocheck
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
      IGDB_Token: "",
      apiResults: [],
      isInputFocused: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalState = this.toggleModalState.bind(this);
    this.searchThroughAPI = this.searchThroughAPI.bind(this);
    this.onSelectTitle = this.onSelectTitle.bind(this);
  }
  

  capitalize(word) {
    let array = word.split(' ');
    if(array.length > 1) {
      return array.map(entry => entry.charAt(0).toUpperCase() + entry.toLowerCase().slice(1)).join(" ");
    } else {
      return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
    }
  }

   async searchThroughAPI(value) {
    const slug_value = value.replace(/ /g, "-").toLowerCase().replace(/[.,/#!$%'^&*;:{}=-_`~()]/g, "");
    const response = await fetch(`${this.serverDomain}/igdb/${slug_value}`);
    const suggestions = await response.json();

    if (!suggestions) {
      return;
    };

    this.setState({apiResults: suggestions.data});
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

  handleChange(event) {
    this.searchThroughAPI(event.target.value);
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
                  onChange={this.handleChange} 
                  className={this.state.inputClass} 
                  type="text" 
                  id="lname" 
                  name="gameTitle" 
                  placeholder="Titre d'un jeu"></input>
          <div className={this.state.isInputFocused && this.state.apiResults.length ? "dropdown-menu active" : "dropdown-menu"} id="dropdown-menu">
            <div className="dropdown-content has-background-black-ter">
              {this.state.apiResults.map((result) =>
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