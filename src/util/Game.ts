import { HexColor } from './common'
import ShapeDrawer, { Tetromino } from './ShapeDrawer'

/**
 * A simple game.
 */
export interface IGame {

    width: number
    height: number
    readonly canvas: HTMLCanvasElement

    /**
     * Is called once before the game starts to prepare the initial state.
     */
    setup(): void

    start?(): void

    /**
     * Draws the next frame.
     */
    step(): void
}

type GameState = {
    isBlue: boolean
}

export default class Game implements IGame {

    /* Fields */

    private readonly shapeDrawer: ShapeDrawer

    private ticks: number = 0
    private readonly framesTilChange: number = 60

    private state: GameState
    
    public isPaused: boolean = false

    constructor(
        public width: number,
        public height: number,
        public readonly canvas: HTMLCanvasElement
    ) {
        this.shapeDrawer = new ShapeDrawer(this.canvas)

        this.setup = this.setup.bind(this)
        this.start = this.start.bind(this)
        this.step = this.step.bind(this)

        this.state = {
            isBlue: true
        }
    }

    public setup(): void {
        console.log('setup')
        console.log(this)
        console.log({ width: this.width, height: this.height })
    }

    public start(): void {
        // TODO: Initialize state here
        this.paintBlue()
        this.step()
    }

    public step(): void {
        console.log('step')

        this.ticks += 1

        if (this.ticks > this.framesTilChange) {
            console.log('Flip')
            this.ticks = 0
            if (this.state.isBlue) {
                this.paintRed()
                this.state.isBlue = false
            } else {
                this.paintBlue()
                this.state.isBlue = true
            }
        }

        if (!this.isPaused) {
            requestAnimationFrame(this.step)
        }
    }

    private paint(color: HexColor) {
        const ctx = this.canvas.getContext('2d')
        if (ctx !== null) {
            ctx.fillStyle = color
            ctx.fillRect(0, 0, this.width, this.height)
        }
    }

    private paintBlue = () => this.paint('#0000ff')
    private paintRed = () => this.paint(`#ff0000`)
}
