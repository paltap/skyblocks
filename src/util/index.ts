import { Dimensions } from './common'

/**
 * @param ratio ratio = width / height.
 * @returns The maximum possible dimensions for a view within the allowed width and height 
 *          of the specified ratio.
 */
export function getInnerDimensions(
    allowedWidth: number,
    allowedHeight: number,
    ratio: number,
): Dimensions {
    const hasExtraHeight: boolean = (allowedWidth / allowedHeight) < ratio

    let width
    let height
    if (hasExtraHeight) {
        // Calculate based on width
        width = allowedWidth
        height = Math.round(allowedWidth / ratio)
    } else {
        // Calculate based on height
        width = Math.round(allowedHeight * ratio)
        height = allowedHeight
    }
    return { width, height }
}