import React from 'react'
import Image, { imageStatuses } from "./Image.jsx";
import Form from "./Form.jsx";
import Modal from './Modal.jsx';
import { getGameDocument } from '../services/document.service.ts';
import "./Game.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesProps: [
        {src: undefined, status: imageStatuses.hidden, onClick: undefined}, 
        {src: undefined, status: imageStatuses.hidden, onClick: undefined},      
        {src: undefined, status: imageStatuses.hidden, onClick: undefined},      
        {src: undefined, status: imageStatuses.hidden, onClick: undefined},           
      ],
      title: "",
      revealedImagesCount: 0,
      submittedFormsCount: 0,
      isGameFinished: false,
      isGameWon: false,
    }
  };

  images;

  componentDidMount() {
    getGameDocument()
      .then(gameDocument => {
        this.images = gameDocument.images;
        this.setState({title: gameDocument.title.toLowerCase()});
        this.updateImagesState();
      })
  }

  updateImagesState() {
    const lastRevealedIndex = this.state.revealedImagesCount;
    const newImagesState = [];

    this.images.forEach((image, index) => {
      let props;
  
      if (index === lastRevealedIndex) {
        props = {src: image, status: undefined, onClick: undefined};
      } else if (index === lastRevealedIndex+1) {
        props = {src: undefined, status: imageStatuses.nextToReveal, onClick: () => this.updateImagesState()};
      } else {
        props = this.state.imagesProps[index];
      }

      newImagesState.push(props);
    });

    this.setState({
      imagesProps: newImagesState,
      revealedImagesCount: lastRevealedIndex+1,
    });
  };

  updateFormState(value) {
    const newCount = this.state.submittedFormsCount+1;
    const isWon = value.trim().toLowerCase() === this.state.title;
    this.setState({submittedFormsCount: newCount});

    if (isWon || this.state.submittedFormsCount+1 === 10) {
      this.setState({isGameFinished: true, isGameWon: isWon});
      return;
    }

    this.setState({error:`${10-newCount} essais restants`});
  }

  render() {
    return (
      <div className="game">
        <div className='game-gallery'>
          <Image {...this.state.imagesProps[0]} />
          <Image {...this.state.imagesProps[1]} />
          <Image {...this.state.imagesProps[2]} />
          <Image {...this.state.imagesProps[3]} />
        </div>

        <h2 className="subtitle has-text-white-bis">Sauriez-vous deviner quel jeu vidéo se cache <br></br> derrière les images ci-dessus ?</h2>
        
        <Form error={this.state.error} 
              onSubmit={(value) => this.updateFormState(value)} />
        { this.state.isGameFinished ? <Modal modalContent={{title: "Votre score", hints: this.state.revealedImagesCount-1, submits: {count: this.state.submittedFormsCount-1, isWon: this.state.isGameWon}}} /> : null }
      </div>
    );
  }
}

export default Game;