import React from 'react';
import './Thumbnail.css'

import { PrismicRichText, useFirstPrismicDocument } from '@prismicio/react'

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
  }

    render() {
      return (
        <div className='thumbnail-frame'>
          <img className='thumbnail-frame-content' src={this.props.img}></img>
        </div>
      )
    }
  }

  export default Thumbnail;