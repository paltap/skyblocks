import React from 'react'

import Game, { IGame } from './class/Game'

import CanvasStack from './util/CanvasStack'
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

  private canvasStackRef: React.RefObject<CanvasStack>

  private game: IGame | null = null

  private idealDimensions: Dimensions

  constructor(props: AppProps) {
    super(props)
    
    const dimensions = getGameDimensions(window.innerWidth - 30, window.innerHeight - 30)
    this.idealDimensions = dimensions

    // const canvasElement = document.createElement('canvas')
    // canvasElement.width = width
    // canvasElement.height = height

    this.canvasStackRef = React.createRef()
  }

  componentDidMount() {
    const canvasStack = this.canvasStackRef.current
    if (canvasStack) {
      const canvases = canvasStack.getCanvases()
      const { width, height } = this.idealDimensions
      this.game = new Game(width, height, canvases)

      ;(this.game.start || this.game.step)()
    }
  }

  render() {
    const { width, height } = this.idealDimensions

    return (
      <>
        <div className="gameWrapper" style={{ width: '100vw' }}>
          <CanvasStack
            ref={this.canvasStackRef}
            id="game"
            style={{
              width,
              height,
              margin: '0 auto'
            }}
            
            superId="gameCanvas"
            num={2}
            width={width}
            height={height}
          />
        </div>
      </>
    );
  }
}

// export default App;
