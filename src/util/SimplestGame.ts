import { HexColor } from './common'
import { IGame } from './Game'



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
