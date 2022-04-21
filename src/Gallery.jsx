import React from 'react';
import Thumbnail from './Thumbnail'
import './Gallery.css'

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: [],
      NextToReveal: 2,
      IsSecondHint: false,
      IsThirdHint: false,
      IsFourthHint: false,
    }
    this.revealNextHint = this.revealNextHint.bind(this);
    this.FetchData = this.FetchData.bind(this);
    this.FetchData();
  }

  FetchData() {
    fetch('https://safe-forest-51192.herokuapp.com/images')
    .then(response => response.json())
    .then(data => {
      this.setState({source : data});
    });
  }

  revealNextHint(step) {
    this.props.parentCallback(step);
    let nextStep = step + 1;
    this.setState({NextToReveal: nextStep});
    step === 2 ? this.setState({IsSecondHint: true}) : console.log('passed');
    step === 3 ? this.setState({IsThirdHint: true}) : console.log('passed');
    step === 4 ? this.setState({IsFourthHint: true}) : console.log('passed');
  }

    render() {
      return (
        <div className="columns">
          <div className="column">
            { this.state.source.length > 0 && (
              <Thumbnail img={this.state.source[0].url} />
           )
            }
          </div>
          <div className="column">
           { this.state.IsSecondHint ? <Thumbnail img={this.state.source[1].url} /> : this.state.NextToReveal === 2 ? <div className="next-to-reveal" onClick={() => this.revealNextHint(2)}><span className="plus">+</span></div> : <div className="hidden"></div> }
          </div>
          <div className="column">
           { this.state.IsThirdHint ? <Thumbnail img={this.state.source[2].url} /> : this.state.NextToReveal === 3 ? <div className="next-to-reveal" onClick={() => this.revealNextHint(3)}><span className="plus">+</span></div> : <div className="hidden"></div> }
          </div>
          <div className="column">
           { this.state.IsFourthHint ? <Thumbnail img={this.state.source[3].url} /> : this.state.NextToReveal === 4 ? <div className="next-to-reveal" onClick={() => this.revealNextHint(4)}><span className="plus">+</span></div> : <div className="hidden"></div> }
          </div>
        </div>
      );
    }
  }

  export default Gallery;