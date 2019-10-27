import { HexColor, Point } from './common'

export enum Tetromino {
    // Free blocks

    /** Straight polyomino. Four blocks in a straight line. */
    I = 'I',

    /** Square polyomino. Four blocks in a 2x2 square. */
    O = 'O',

    /** T polyomino. A row of three blocks with one added below the center. */
    T = 'T',

    // L blocks

    /** Commonly blue. A column of three blocks with one attached to the right side of the top block. */
    J = 'J',

    /** Commonly orange. A column of three blocks with one attached to the left side of the top block. */
    L = 'L',

    // "Skew" blocks

    /** Commonly green. */
    S = 'S',

    /** Commonly red. */
    Z = 'Z',
}

export const DEFAULT_TETROMINO_COLORS: Record<Tetromino, HexColor> = {
    [Tetromino.I]: 'cyan',
    [Tetromino.O]: 'yellow',
    [Tetromino.T]: 'magenta',
    [Tetromino.J]: 'blue',
    [Tetromino.L]: 'orange',
    [Tetromino.S]: 'green',
    [Tetromino.Z]: 'red',
}

export interface IShapeDrawer {

    readonly canvas: HTMLCanvasElement

    readonly tetrominoColors: Record<Tetromino, HexColor>

    drawTetromino(tetromino: Tetromino): void

    // ...more coming
}

export default class ShapeDrawer implements IShapeDrawer {

    constructor(
        readonly canvas: HTMLCanvasElement,
        readonly tetrominoColors: Record<Tetromino, HexColor> = DEFAULT_TETROMINO_COLORS
    ) {
        this.drawTetromino = this.drawTetromino.bind(this)
    }

    drawTetromino(tetromino: Tetromino, point: Point = { x: 0, y: 0 }): any {
        console.log(this.tetrominoColors[tetromino])
    }
}