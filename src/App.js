import './App.css'
import Game from './Game'
import { useFirstPrismicDocument } from '@prismicio/react'
import React from 'react'


function App() {
  const [document] = useFirstPrismicDocument();

    return (
      <>
        <div className="App section has-background-black-bis">
          <h1 className="title has-text-white-bis">game2guess</h1>
        {document && (
          <>
            <Game document={document} />
          </>
        )}
        </div>
        <footer className="footer has-background-grey-darker has-text-grey-light">
          © game2guess, un concept de LolaMad développé par ClemBoss
        </footer>
      </>
    );
  }

export default App;
