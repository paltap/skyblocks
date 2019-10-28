import * as R from 'ramda'
import React from 'react'

const standardPropList = ['className', 'id', 'style'] as const
type StandardProp = typeof standardPropList[number]
type StandardProps = Record<StandardProp, any>

type CanvasStackProps = {
    num: number
    
    superId: string
    
    width: number
    height: number
    
    zIndex?: number
} & Partial<StandardProps>

/**
 * Manages a stack of canvases.
 */
export default class CanvasStack extends React.Component<CanvasStackProps> {
    
    /** Ref to the div holding all of the canvases. */
    parentRef: React.RefObject<HTMLDivElement>

    canvases: HTMLCanvasElement[] = []

    constructor(props: CanvasStackProps) {
        super(props)
        this.parentRef = React.createRef()
    }

    componentDidMount() {
        const ref = this.parentRef.current
        const startingZIndex = this.props.zIndex || 0

        if (ref) {
            console.log(ref)
            for (const layerNumber of R.range(0, this.props.num)) {
                const layerId = `${this.props.superId}-layer${layerNumber}`
                const layerZIndex = startingZIndex + layerNumber

                const canvasWrapper = document.createElement('div')
                canvasWrapper.innerHTML = `<canvas
                    width=${this.props.width}
                    height=${this.props.height}
                    id=${layerId}
                    style="
                        position: absolute;
                        z-index: ${layerZIndex}
                    "
                />`

                const canvas = canvasWrapper.firstChild as HTMLCanvasElement

                this.canvases.push(canvas)
                ref.appendChild(canvas)
            }
        }
    }

    render() {
        const standardProps = R.pick(standardPropList, this.props)

        return (
            <div 
                ref={this.parentRef}
                {...standardProps}
            />
        )
    }
}
