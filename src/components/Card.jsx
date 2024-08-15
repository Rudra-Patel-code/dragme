/* eslint-disable react/prop-types */
// src/components/Card.js
import { useState } from "react";
import { useDrag } from "react-dnd";
import { ResizableBox } from "react-resizable";
import "./Card.css";

const Card = ({
    id,
    left,
    top,
    text,
    onCardClick,
    isSelected,
    setIsPopupOpen,
}) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(100);
    const [{ isDragging }, drag] = useDrag({
        type: "CARD",
        item: { id, left, top },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: () => !isPopoverOpen, // Disable drag if popover is open
    });

    const handleShowMore = () => {
        setIsPopoverOpen(true);
        setIsPopupOpen(true);
    };

    const handleClosePopover = () => {
        setIsPopoverOpen(false);
        setIsPopupOpen(false);
    };

    return (
        <>
            <ResizableBox
                onResize={(e, { node, size, height }) => {
                    setHeight(size.height);
                    setWidth(size.width);
                }}
                width={width}
                height={height}
                style={{
                    width: width + "px",
                    height: height + "px",
                }}
                minConstraints={[100, 50]}
            >
                <div
                    ref={drag}
                    style={{
                        left,
                        top,
                        position: "absolute",
                        opacity: isDragging ? 0.5 : 1,
                        border: isSelected
                            ? "2px solid blue"
                            : "1px solid #ccc",
                    }}
                    className="card"
                    onClick={() => onCardClick(id)}
                >
                    <div className="card-content">
                        <p>Card {id}</p>
                        <button onClick={handleShowMore}>Show More</button>
                    </div>
                </div>
            </ResizableBox>

            {isPopoverOpen && (
                <div className="popover">
                    <div className="popover-content">
                        <h3>Details for Card {id}</h3>
                        <p>{text}</p>
                        <button onClick={handleClosePopover}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;
