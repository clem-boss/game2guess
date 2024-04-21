import React from 'react';
import { throttle } from '../helpers/throttle';
import { getIGDBSuggestionsByGameName } from "../services/igdb.service";
import "./Form.css";



export function Suggestions({suggestions, onClick}) {
  if (!suggestions.length) {
    return null;
  }

  const listItems = suggestions.map(title => <option onClick={(title) => onClick(title)}>{title}</option>);

  return <select className="select is-multiple" multiple>{listItems}</select>;
}

export function Error({error}) {
  if (!error) {
    return null;
  }
  return <p className="error">{error}</p>;
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
    }
  }

  updateSuggestionsState(queryString) {
    this.setState({value: queryString});
    if (queryString.length > 3) {
      throttle(getIGDBSuggestionsByGameName(queryString)
        .then(result => this.setState({suggestions: result})), 300);
    } else {
      this.setState({suggestions: []})
    }
  }


    render() {
      return (
        <>
          <div className="game-form">
              <div>
                <Error error={this.props.error} />
                <input onChange={(e) => this.updateSuggestionsState(e.target.value)} 
                    type="text" 
                    name="gameTitle"
                    className="input"
                    placeholder="Titre d'un jeu"></input>
              </div>
              <button className="button is-primary" onClick={() => this.props.onSubmit(this.state.value)}>Envoyer</button>
              <Suggestions suggestions={this.state.suggestions} onClick={(e) => this.setState({value: e.target.value})} />
          </div>
        </>
      )
    };
};

export default Form;