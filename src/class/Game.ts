import { HexColor } from '../util/common'
import ShapeDrawer, { Skyblock } from './ShapeDrawer'
import { getInnerDimensions } from '../util'
import { range } from 'ramda'

type CanvasEl = HTMLCanvasElement

/**
 * A simple game.
 */
export interface IGame {

    width: number
    height: number
    readonly canvas: CanvasEl

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

class Grid {

    /** Grid total width, in px. */
    width: number
    /** Grid total height, in px. */
    height: number

    public static numTilesWide = 10
    public static numTilesHigh = 20

    constructor(
        readonly canvas: CanvasEl,
    ) {
        const ratio = Grid.numTilesWide / Grid.numTilesHigh

        const { width, height } = getInnerDimensions(canvas.width, canvas.height, ratio)

        this.width = width
        this.height = height

        console.log({ tileSize: this.getTileSize() })

        // for (const gx of range(0, Grid.numTilesWide)) {
        //     for (const gy of range(0, Grid.numTilesHigh)) {
        //         console.log({ gx, gy })
        //     }
        // }

        this.render()
    }

    getTileSize = () => Number((this.width / Grid.numTilesWide).toFixed(0))

    public render() {
        const gridContext = this.canvas.getContext('2d')

        this.renderGrid(gridContext!)
    }
    
    private renderGrid(ctx: CanvasRenderingContext2D) {
        const tileSize = this.getTileSize()

        const start = { x: 1, y: 1 }

        ctx.beginPath()
        for (const gx of range(0, Grid.numTilesWide)) {
            for (const gy of range(0, Grid.numTilesHigh)) {
                const tileStart = { x: start.x + (gx * tileSize), y: start.y + (gy * tileSize) }

                ctx.moveTo(tileStart.x, tileStart.y)
                ctx.strokeRect(tileStart.x, tileStart.y, tileSize, tileSize)
            }
        }
        ctx.stroke()

        // const ctx = this.canvas.getContext('2d')
        // if (ctx) {
        //     ctx.fillStyle = '#00ff00'
        //     ctx.fillRect(0, 0, this.width, this.height)
        // }
    }



}

export default class Game implements IGame {

    /* Fields */

    private readonly grid: Grid
    private readonly shapeDrawer: ShapeDrawer

    private ticks: number = 0
    private readonly framesTilChange: number = 60

    private state: GameState
    
    public isPaused: boolean = false

    constructor(
        public width: number,
        public height: number,
        public readonly canvas: CanvasEl
    ) {
        this.grid = new Grid(this.canvas)
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
        this.grid.render()
        // this.step()
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

        // this.grid.render()

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
