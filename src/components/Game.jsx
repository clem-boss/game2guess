import React from 'react'
import Image, { ImageStatuses } from "./Image.tsx";
import Form from "./Form.tsx";
import { getGameDocument } from '../services/document.service.ts';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      title: {},
    }
  }

  componentDidMount() {
    getGameDocument()
    .then(gameDocument => {
        this.setState({
          images: gameDocument.images,
          title: gameDocument.title,
        });
      })
  }
  render() {
    return (
      <>
        <Image src={this.state.images[0]} status={undefined} />
        <Image src={this.state.images[1]} status={ImageStatuses.NEXT_TO_REVEAL} />
        <Image src={this.state.images[2]} status={ImageStatuses.HIDDEN} />
        <Image src={this.state.images[3]} status={ImageStatuses.HIDDEN} />

        <h2 className="subtitle has-text-white-bis">Sauriez-vous deviner quel jeu vidéo se cache <br></br> derrière les images ci-dessus ?</h2>
        
        <Form suggestions={undefined} 
              error={undefined} 
              onSubmit={undefined} 
              onChange={undefined} />
      </>
    );
  }
}

export default Game;