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

    /**
     * Draws the next frame.
     */
    step(): void
}

/**
 * A game that employs an event system.
 */
export interface IRegularEventGame extends IGame {
    /**
     * Is called to progress the scene.
     */ 
    progress(): void
}

type SimplestGameState = {
    isBlue: boolean
}

export class SimplestGame implements IGame {

    /* Fields */

    private ticks: number = 0
    private readonly framesTilChange: number = 60
    private state: SimplestGameState
    public isPaused: boolean = false

    constructor(public width: number, public height: number, public readonly canvas: HTMLCanvasElement) {
        this.setup = this.setup.bind(this)
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

    private paintBlue(): void {
        const ctx = this.canvas.getContext('2d')
        if (ctx !== null) {
            ctx.fillStyle = '#0000ff'
            ctx.fillRect(0, 0, 600, 900)
        }
    }

    private paintRed(): void {
        const ctx = this.canvas.getContext('2d')
        if (ctx !== null) {
            ctx.fillStyle = '#ff0000'
            ctx.fillRect(0, 0, 600, 900)
        }
    }
}


export default class Game implements IRegularEventGame {

    constructor(public width: number, public height: number, readonly canvas: HTMLCanvasElement) {

    }

    setup(): void {
        console.log('setup')
        console.log({ width: this.width, height: this.height })
    }

    step(): void {
        console.log('update')
    }

    progress(): void {
        console.log('progress')
    }

}
