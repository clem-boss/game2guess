import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

import { PrismicProvider } from '@prismicio/react'
// import { client } from './prismic'

ReactDOM.render(
  <React.StrictMode>
    {/* <PrismicProvider client={client}> */}
      <App />
    {/* </PrismicProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

