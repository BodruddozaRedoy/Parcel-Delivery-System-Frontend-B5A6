import React, { useState, useRef, useEffect } from "react"

type Dot = {
    id: string
    x: number
    y: number
}

type Box = {
    id: string
    top: number
    left: number
    dots: Dot[]
}

type Line = {
    from: { boxId: string; dotId: string }
    to: { boxId: string; dotId: string }
}

export default function Demo() {
    const containerRef = useRef<HTMLDivElement>(null)

    // boxes with dots
    const [boxes, setBoxes] = useState<Box[]>([
        {
            id: "box1",
            top: 50,
            left: 50,
            dots: [
                { id: "dot1", x: 10, y: 10 },
                { id: "dot2", x: 130, y: 10 },
            ],
        },
        {
            id: "box2",
            top: 200,
            left: 300,
            dots: [
                { id: "dot1", x: 10, y: 10 },
                { id: "dot2", x: 130, y: 10 },
            ],
        },
    ])

    const [selectedDot, setSelectedDot] = useState<{ boxId: string; dotId: string } | null>(
        null
    )
    const [lines, setLines] = useState<Line[]>([])

    // console.log(lines)

    // Helpers to get absolute dot center
    const getDotPosition = (box: Box, dot: Dot) => {
        const dotSize = 16 // w-4 h-4 in Tailwind
        const centerX = box.left + dot.x + dotSize / 2
        const centerY = box.top + dot.y + dotSize / 2
        return { x: centerX, y: centerY }
    }

    // Handle dot click
    const handleDotClick = (box: Box, dot: Dot) => {
        if (!selectedDot) {
            setSelectedDot({ boxId: box.id, dotId: dot.id })
        } else {
            setLines([...lines, { from: selectedDot, to: { boxId: box.id, dotId: dot.id } }])
            setSelectedDot(null)
        }
    }

    // Dragging logic
    const dragData = useRef<{ boxId: string; offsetX: number; offsetY: number } | null>(
        null
    )

    const handleMouseDown = (e: React.MouseEvent, box: Box) => {
        dragData.current = {
            boxId: box.id,
            offsetX: e.clientX - box.left,
            offsetY: e.clientY - box.top,
        }
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!dragData.current) return
        setBoxes((prev) =>
            prev.map((b) =>
                b.id === dragData.current!.boxId
                    ? {
                        ...b,
                        left: e.clientX - dragData.current!.offsetX,
                        top: e.clientY - dragData.current!.offsetY,
                    }
                    : b
            )
        )
    }

    const handleMouseUp = () => {
        dragData.current = null
    }

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handleMouseUp)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen bg-gray-50 overflow-hidden"
        >
            {/* SVG Lines */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                {lines.map((line, index) => {
                    const fromBox = boxes.find((b) => b.id === line.from.boxId)!
                    const toBox = boxes.find((b) => b.id === line.to.boxId)!
                    const fromDot = fromBox.dots.find((d) => d.id === line.from.dotId)!
                    const toDot = toBox.dots.find((d) => d.id === line.to.dotId)!
                    const fromPos = getDotPosition(fromBox, fromDot)
                    const toPos = getDotPosition(toBox, toDot)

                    // control points for curve (simple horizontal curve example)
                    const midX = (fromPos.x + toPos.x) / 2
                    const controlPoint1 = `${midX},${fromPos.y}`
                    const controlPoint2 = `${midX},${toPos.y}`

                    return (
                        <path
                            key={index}
                            d={`M ${fromPos.x},${fromPos.y} C ${controlPoint1} ${controlPoint2} ${toPos.x},${toPos.y}`}
                            stroke="black"
                            strokeWidth={2}
                            fill="none"
                        />
                    )
                })}
            </svg>


            {/* Boxes */}
            {boxes.map((box) => (
                <div
                    key={box.id}
                    className="absolute w-40 h-40 bg-white border shadow-md cursor-move"
                    style={{ top: box.top, left: box.left }}
                    onMouseDown={(e) => handleMouseDown(e, box)}
                >
                    {box.dots.map((dot) => (
                        <div
                            key={dot.id}
                            className="absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer z-20"
                            style={{ top: dot.y, left: dot.x }}
                            onClick={(e) => {
                                e.stopPropagation() // prevent drag when clicking dot
                                handleDotClick(box, dot)
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
