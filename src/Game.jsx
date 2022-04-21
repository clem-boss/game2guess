import React from 'react'
import Gallery from './Gallery'
import Form from './Form'
import {decrypt} from './encrypt.js'



class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfImages: 1,
      hints: [],
      content: '',
      title: '',
      images: [],
    }
    this.handleFormCallback = this.handleFormCallback.bind(this);
    this.handleGalleryCallback = this.handleGalleryCallback.bind(this);
    this.makeImagesGauge = this.makeImagesGauge.bind(this);
    this.FetchData = this.FetchData.bind(this);
    //this.makeImagesGauge();
  }

  componentDidMount() {
    this.FetchData();
    this.makeImagesGauge(1);
  }

  FetchData() {
    fetch('https://safe-forest-51192.herokuapp.com/title')
    .then(response => response.json())
    .then(data => this.setState({title : decrypt(data)}));
  }

  handleFormCallback(childData) {
    childData ? this.setState({content: "success"}) : this.setState({content: "missed"})
  }

  handleGalleryCallback(childData) {
    this.setState({numberOfImages: childData});
    this.makeImagesGauge(childData);
  }

  makeImagesGauge(numberOfImages) {
    let hints = [];
    for (let i = 1; i <= numberOfImages; i++) {
      hints.push(<span>🟨</span>)
    }
    for (let i = 1; i <= (4 - numberOfImages); i++) {
      hints.push(<span>⬛</span>)
    }
    this.setState({hints: hints});
  }
    render() {
      return (
        <>
          <Gallery parentCallback={this.handleGalleryCallback} source={this.state.images} />
          <h2 className="subtitle has-text-white-bis">Sauriez-vous deviner quel jeu vidéo se cache <br></br> derrière les images ci-dessus ?</h2>
          <Form hints={this.state.hints} parentCallback={this.handleFormCallback} goal={this.state.title} />
        </>
      );
    }
  }

  export default Game;