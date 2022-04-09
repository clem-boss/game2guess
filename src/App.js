import logo from './logo.svg'
import './App.css'
import Gallery from './Gallery'
import Form from './Form'
import Modal from './Modal'
import { PrismicRichText, useFirstPrismicDocument } from '@prismicio/react'


function App() {
  const [document] = useFirstPrismicDocument();
  let content = "";
  let numberOfImages = 1;

  function handleFormCallback(childData) {
    console.log('childData' + childData);
    childData ? content = "success" : content = "missed!"
  }

  function handleGalleryCallback(childData) {
    numberOfImages = childData;
    console.log(childData);
  }

  return (
    <div className="App section has-background-black-bis">
      <h1 className="title has-text-white-bis">game2guess</h1>
      {document && (
        <>
          <Gallery parentCallback={handleGalleryCallback} source={document.data} />
          <h2 className="subtitle has-text-white-bis">Sauriez-vous deviner quel jeu vidéo se cache <br></br> derrière les images ci-dessus ?</h2>
          <Form numberOfImages={numberOfImages} parentCallback={handleFormCallback} goal={document.data.title[0].text} />
        </>
      )}
    </div>
  );
}
export default App;
