import { range } from 'ramda'

import { HexColor, Point, Position } from '../util/common'
import ShapeDrawer, { Skyblock, DEFAULT_SKYBLOCK_COLORS } from './ShapeDrawer'
import { getInnerDimensions } from '../util'

type CanvasEl = HTMLCanvasElement

/**
 * A simple game.
 */
export interface IGame {

    width: number
    height: number
    readonly canvas?: CanvasEl
    readonly canvases?: CanvasEl[]

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

type GridSkyblockState = {}

enum Orientation {
    UP,
    LEFT,
    DOWN,
    RIGHT,
}

type GridSkyblock = {
    type: Skyblock
    orientation: Orientation
    position: Point
    tiles: Point[]
}

type GridSettings = {
    skyblockColors: Record<Skyblock, HexColor>
}

class Grid {

    readonly canvasWidth: number
    readonly canvasHeight: number

    /** Grid total width, in px. */
    readonly width: number
    /** Grid total height, in px. */
    readonly height: number

    public static readonly numTilesWide = 10
    public static readonly numTilesHigh = 20

    private readonly gridSettings: GridSettings = {
        skyblockColors: DEFAULT_SKYBLOCK_COLORS,
    }

    private readonly gridSkyblocks: GridSkyblock[] = [
        {
            type: Skyblock.I,
            orientation: Orientation.UP,
            position: { x: 0, y: 0 },
            tiles: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]
        }
    ]

    constructor(
        readonly canvas: CanvasEl,
    ) {
        const ratio = Grid.numTilesWide / Grid.numTilesHigh

        this.canvasWidth = canvas.width
        this.canvasHeight = canvas.height

        const { width, height } = getInnerDimensions(canvas.width, canvas.height, ratio)

        this.width = width
        this.height = height

        this.render()

        console.log(this.canvas)
    }

    public render(): void {
        const gridContext = this.canvas.getContext('2d')
        if (gridContext) {
            gridContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
            this.renderGrid(gridContext)
            this.renderSkyblocks(gridContext)
        }
    }

    /**
     * Takes the next turn.
     * The player's tetris block will fall.
     */
    public progress(): void {
        if (this.gridSkyblocks.length >= 1) {
            const gridblock = this.gridSkyblocks[0]
            const canFall = (gridblock.tiles.every((tile) => 
                tile.y < (Grid.numTilesHigh - 1)
            ))

            // console.log({ canFall })
            if (canFall) {
                for (const tile of gridblock.tiles) {
                    // console.log(tile.y)
                    tile.y += 1;
                }
            }
        }
    }

    /* Render functions */
    
    private renderGrid(ctx: CanvasRenderingContext2D): void {
        const tileSize = this.getTileSize()
        const start = this.getStart()

        ctx.beginPath()
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'

        for (const gx of range(0, Grid.numTilesWide)) {
            for (const gy of range(0, Grid.numTilesHigh)) {
                const tileStart = this.getTileCorner({ x: gx, y: gy })
                ctx.strokeRect(tileStart.x, tileStart.y, tileSize, tileSize)
            }
        }

        ctx.stroke()
    }

    private renderSkyblocks(ctx: CanvasRenderingContext2D): void {
        const start = this.getStart()
        const tileSize = this.getTileSize()

        ctx.beginPath()
        ctx.strokeStyle = 'white'
        for (const { type, orientation, position, tiles } of this.gridSkyblocks) {
            const color = this.gridSettings.skyblockColors[type]
            ctx.fillStyle = color

            for (const { x, y } of tiles) {
                // console.log({ x, y })
                const tileCorner = this.getTileCorner({ x, y })
                ctx.fillRect(tileCorner.x, tileCorner.y, tileSize, tileSize)
                ctx.strokeRect(tileCorner.x, tileCorner.y, tileSize, tileSize)
            }
        }
        ctx.fill()
    }

    /* Helpers */

    public getStart = (): Point => ({ 
        x: (this.canvas.width - this.width) / 2,
        y: (this.canvas.height - this.height) / 2,
    })

    /**
     * @returns The Point, in pixels, of the top left corner of the specified tile.
     */
    public getTileCorner = (tile: Point): Point => ({
        x: this.getStart().x + (tile.x * this.getTileSize()),
        y: this.getStart().y + (tile.y * this.getTileSize()),
    })

    public getTileSize = () =>
        Number((this.width / Grid.numTilesWide).toFixed(0))
}

export default class Game implements IGame {

    /* Fields */

    private readonly grid: Grid
    private readonly shapeDrawer: ShapeDrawer

    private ticks: number = 0
    private readonly framesTilChange: number = 60

    private state: GameState
    
    public isPaused: boolean = false

    /**
     * Temporary.
     */
    public readonly uiCanvas: CanvasEl
    public readonly gridCanvas: CanvasEl

    constructor(
        public width: number,
        public height: number,
        public readonly canvases: CanvasEl[]
    ) {
        if (canvases.length >= 2) {
            this.uiCanvas = canvases[0]
            this.gridCanvas = canvases[1]
        } else {
            throw new Error(`Game canvas array must be at least length 2`)
        }

        this.grid = new Grid(this.gridCanvas)
        this.shapeDrawer = new ShapeDrawer(this.uiCanvas)

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
        if (this.isPaused === true) {
            return
        }

        this.grid.render()

        
        this.ticks += 1
        if (this.ticks > this.framesTilChange) {
            this.ticks = 0
            this.progress()
        }

        requestAnimationFrame(this.step)
    }

    public progress(): void {
        console.log('progress')
        this.grid.progress()

        // if (this.state.isBlue) {
        //     this.paintRed()
        //     this.state.isBlue = false
        // } else {
        //     this.paintBlue()
        //     this.state.isBlue = true
        // }
    }

    private paint(color: HexColor) {
        const ctx = this.uiCanvas.getContext('2d')
        if (ctx !== null) {
            ctx.fillStyle = color
            ctx.fillRect(0, 0, this.width, this.height)
        }
    }

    private paintBlue = () => this.paint('#0000ff')
    private paintRed = () => this.paint(`#ff0000`)
}
