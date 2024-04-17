import './App.css'
import Game from './components/Game'
import React from 'react'

function App() {
    return (
      <>
        <div className="App section has-background-black-bis">
          <h1 className="logo title has-text-white-bis">game2guess</h1>
            <Game />
         </div>
        <footer className="footer has-background-grey-darker has-text-grey-light">
          © game2guess, un concept de LolaMad développé par ClemBoss
        </footer>
      </>
    );
  }

export default App;
