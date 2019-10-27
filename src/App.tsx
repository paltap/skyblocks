import React from 'react'

import Game, { IGame } from './util/Game'

/**
 * Multiply GAME_RATIO = width / height
 */
const GAME_RATIO = 2 / 3

type Dimensions = {
  width: number
  height: number
}

function getGameDimensions(
  effectiveInnerWidth?: number,
  effectiveInnerHeight?: number
): Dimensions {
  // Disambiguation
  const innerWidth = effectiveInnerWidth !== undefined ? effectiveInnerWidth : window.innerWidth
  const innerHeight = effectiveInnerHeight !== undefined ? effectiveInnerHeight : window.innerHeight
  
  /* Logic */
  const hasExtraHeight = innerWidth / innerHeight < GAME_RATIO

  let width
  let height
  if (hasExtraHeight) {
    // Calculate based on width
    width = innerWidth
    height = Math.round(width / GAME_RATIO)
  } else {
    // Calculate based on height
    height = innerHeight
    width = Math.round(height * GAME_RATIO)
  }
  return { width, height }
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
