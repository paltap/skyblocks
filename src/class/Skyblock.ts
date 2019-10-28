import { HexColor } from '../util/common'

export enum Skyblock {
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

export const DEFAULT_SKYBLOCK_COLORS: Record<Skyblock, HexColor> = {
    [Skyblock.I]: 'cyan',
    [Skyblock.O]: 'yellow',
    [Skyblock.T]: 'magenta',
    [Skyblock.J]: 'blue',
    [Skyblock.L]: 'orange',
    [Skyblock.S]: 'green',
    [Skyblock.Z]: 'red',
}
