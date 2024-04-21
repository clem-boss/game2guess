function Hints({hints}) {
  let hintsToText = [];

  for (let i = 0; i < 4; i++) {
    const newChar = i <= hints ? "⬜" : "⬛";
    hintsToText.push(newChar);
  }

  return hintsToText.join(" ");
}

function Submits({submits}) {
  let submitsToText = [];

  for (let i = 0; i < 10; i++) {
    let newChar = i <= submits.count ? "❌" : "⚬";
    if (i === submits.count && submits.isWon) {
      newChar = "✅"
    }
    submitsToText.push(newChar);
  }

  return submitsToText.join(" ");
}

export function Modal({modalContent}) {
      return (
        <div className='modal is-active'>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="card">
              <div className="card-content">
              <h2 className="title">{modalContent.title}</h2>
              <p className='content'>
                Indices: <Hints hints={modalContent.hints} /><br></br>
                Réponses: <Submits submits={modalContent.submits} />
              </p>
              </div>
              </div>
          </div>
        </div>
      );
  }

  export default Modal;