/* eslint-disable react/prop-types */
// src/components/Connection.js
import "./Connections.css";

const Connection = ({ startX, startY, endX, endY }) => {
    return (
        <svg
            className="connection"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
            }}
        >
            <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="black"
                strokeWidth="2"
            />
        </svg>
    );
};

export default Connection;
