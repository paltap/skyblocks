import React from 'react';
import logo from './logo.svg';
import './App.css';

import Game, { SimplestGame, IGame } from './util/Game'

type MyCanvasProps = {
  width: number,
  height: number,
}
const MyCanvas: React.FC<MyCanvasProps> = ({ width, height }) => {

  return (
    <canvas width={width} height={height} />
  )
}


// const App: React.FC = () => {

//   const game = new Game(600, 900)
//   game.setup()

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>

//         <MyCanvas width={game.width} height={game.height} />
//       </header>
//     </div>
//   );
// }


export default class App extends React.Component {

  private game: IGame

  constructor(props: any) {
    super(props)

    const canvasElement = document.createElement('canvas')
    canvasElement.width = 600
    canvasElement.height = 900

    this.game = new SimplestGame(600, 900, canvasElement)
    this.game.setup()
  }

  componentDidMount() {
    this.game.step()

    const header = document.getElementById('header')
    header!.appendChild(this.game.canvas)
  }

  render() {

    const { game } = this
  
    return (
      <div className="App">
        <header className="App-header" id="header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
  
        </header>
      </div>
    );
  }
}

// export default App;
