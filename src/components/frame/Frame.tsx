import { PointerEventHandler, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './Frame.module.css'



import { usePinch } from '@use-gesture/react'
import { motion, useDragControls, useMotionValue, useMotionValueEvent } from 'framer-motion'
import ToolsBar from '../toolbar/Toolbar'
import { CanvasMode, CanvasState } from '../toolbar/types'



interface FrameProps {
    children: ReactNode
}





const Frame = ({ children }: FrameProps) => {

    const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None })


    const containerRef = useRef<HTMLDivElement>(null)
    const draggableRef = useRef<HTMLDivElement>(null)

    //camera: 
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const zoom = useMotionValue(1);
    const rotateZ = useMotionValue(0)



    const dragControls = useDragControls()

    const startDrag: PointerEventHandler = (event) => {
        dragControls.start(event)
    }

    useEffect(() => {
        containerRef?.current?.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.ctrlKey) {
                x.set(x.get() - e.deltaY);
                y.set(y.get() - e.deltaX);
            } else {
                x.set(x.get() - e.deltaX);
                y.set(y.get() - e.deltaY);
            }

        })

    })

    const pinch = usePinch(({ event, origin: [ox, oy], first, movement: [ms], offset: [s, a], memo }) => {
        event.preventDefault()


        if (first) {
            const rect = draggableRef.current!.getBoundingClientRect()
            const tx = ox - (rect.x + rect.width / 2)
            const ty = oy - (rect.y + rect.height / 2)
            memo = [x.get(), y.get(), tx, ty]
        }

        const xNew = memo[0] - (ms - 1) * memo[2]
        const yNew = memo[1] - (ms - 1) * memo[3]


        x.set(xNew)
        y.set(yNew)
        zoom.set(s)
        rotateZ.set(a)

        return memo
    })

    const [z, setZoom] = useState(zoom.get())


    useMotionValueEvent(zoom, "change", (latest) => {
        setZoom(latest)
    })





    return (
        <motion.div ref={containerRef} className={styles.container} onPointerDown={startDrag} style={{ touchAction: "none" }}  {...pinch()}>
            <motion.div ref={draggableRef} drag dragControls={dragControls} className={styles.draggable} dragListener={false} dragMomentum={false} dragElastic={0.2} style={{ x, y, scale: zoom, rotateZ }}
            >
                {children}
            </motion.div>
            <ToolsBar canvasState={canvasState} setCanvasState={setCanvasState} />
            <div className={styles.zoom}>{z}</div>
        </motion.div>
    )
}



export { Frame }
