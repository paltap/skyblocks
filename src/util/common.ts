export type HexColor = string

export type Point = {
    x: number
    y: number
}

export type Position = Point

export type Coordinate = [number, number]

export type Dimensions = {
    width: number
    height: number
}

/**
 * Returns a random enum.
 */
export function pickEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue
}