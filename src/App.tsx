import React from 'react'

import Game, { IGame } from './class/Game'

import { Dimensions } from './util/common'
import { getInnerDimensions } from './util'

/**
 * Multiply GAME_RATIO = width / height
 */
const GAME_RATIO = 0.6

function getGameDimensions(
  width: number = window.innerWidth,
  height: number = window.innerHeight,
) {
  return getInnerDimensions(width, height, GAME_RATIO)
}

type AppProps = {}


export default class App extends React.Component<AppProps> {

  private game: IGame

  private idealDimensions: Dimensions

  constructor(props: AppProps) {
    super(props)
    
    const dimensions = getGameDimensions(window.innerWidth - 30, window.innerHeight - 30)
    this.idealDimensions = dimensions
    const { width, height } = dimensions

    const canvasElement = document.createElement('canvas')
    canvasElement.width = width
    canvasElement.height = height

    this.game = new Game(width, height, canvasElement)
    this.game.setup()
  }

  componentDidMount() {
    (this.game.start || this.game.step)()

    const header = document.getElementById('game')
    header!.appendChild(this.game.canvas)
  }

  render() {

    const { game } = this
  
    return (
      <div className="gameWrapper" style={{ width: '100vw' }}>
        <div id="game" style={{ width: this.idealDimensions.width, margin: '0 auto' }} />
      </div>
    );
  }
}

// export default App;
