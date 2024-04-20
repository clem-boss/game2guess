import "./Form.css";


export function Suggestions({suggestions}) {
  if (!suggestions) {
    return null;
  }

  const listItems = suggestions.map(title => <option>{title}</option>);

  return <select className="select is-multiple" multiple>{listItems}</select>;
}

export function Error({error}) {
  if (!error) {
    return null;
  }
  return <p className="error">{error}</p>;
}

export default function Form({suggestions, error, onSubmit, onChange}) {
    return (
        <form className="game-form" autoComplete="off" onSubmit={undefined}>
            <input onChange={undefined} 
                type="text" 
                name="gameTitle"
                className="input"
                placeholder="Titre d'un jeu"></input>
                <Suggestions {...suggestions} />
                <Error {...error} />
                <button type="submit" className="button is-primary">Envoyer</button>
        </form>
    )
};