import React from 'react'
import Image, { imageStatuses } from "./Image.jsx";
import Form from "./Form.jsx";
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
      title: {},
      revealedImagesCount: 0,
      submittedFormsCount: 0,
    }
  };

  images;

  componentDidMount() {
    getGameDocument()
      .then(gameDocument => {
        this.images = gameDocument.images;
        this.updateImagesState();
      })
  }

  returnImageSrc(imageIndex) {
    return imageIndex < this.state.revealedImagesCount ? this.state.imagesProps[imageIndex] : null;
  }

  updateImagesState() {
    const lastRevealedIndex = this.state.revealedImagesCount;
    const newImagesState = [];

    this.images.forEach((image, index) => {
      let props;
  
      if (index === lastRevealedIndex) {
        props = {src: image, status: undefined, onClick: undefined};
      } else if (index === lastRevealedIndex+1) {
        props = {src: undefined, status: imageStatuses.nextToReveal, onClick: () => this.handleImageClick()};
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

  handleImageClick() {
    this.updateImagesState();
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
        
        <Form suggestions={undefined} 
              error={undefined} 
              onSubmit={undefined} 
              onChange={undefined} />
      </div>
    );
  }
}

export default Game;