// src/components/Canvas.js
import { useState } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";
import Connection from "./Connections";
import "./Canvas.css";

const Canvas = () => {
    const [cards, setCards] = useState([]);
    const [connections, setConnections] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newCardText, setNewCardText] = useState("");

    const [, drop] = useDrop({
        accept: "CARD",
        canDrop: () => !isPopupOpen, // Prevent drop if popup is open
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            let left = Math.round(item.left + delta.x);
            let top = Math.round(item.top + delta.y);
            moveCard(item.id, left, top);
        },
    });

    const moveCard = (id, left, top) => {
        setCards((prevCards) =>
            prevCards.map((card) =>
                card.id === id ? { ...card, left, top } : card
            )
        );
    };

    const addConnection = () => {
        if (selectedCards.length === 2) {
            setConnections([
                ...connections,
                { startId: selectedCards[0], endId: selectedCards[1] },
            ]);
            setSelectedCards([]);
        }
    };

    const handleCardClick = (id) => {
        if (selectedCards.includes(id)) {
            setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
        } else if (selectedCards.length < 2) {
            setSelectedCards([...selectedCards, id]);
        }
    };

    const getCardPosition = (id) => {
        const card = cards.find((card) => card.id === id);
        return card ? { left: card.left, top: card.top } : null;
    };

    const handleAddCard = () => {
        if (newCardText.trim() === "") return; // Avoid adding empty cards

        const id = cards.length
            ? Math.max(cards.map((card) => card.id)) + 1
            : 1; // Generate new unique ID
        setCards([...cards, { id, left: 100, top: 100, text: newCardText }]);
        setNewCardText("");
        setIsPopupOpen(false);
    };

    return (
        <div className="canvas" ref={drop}>
            {cards.map((card) => (
                <Card
                    key={card.id}
                    id={card.id}
                    left={card.left}
                    top={card.top}
                    text={card.text}
                    onCardClick={handleCardClick}
                    isSelected={selectedCards.includes(card.id)}
                    setIsPopupOpen={setIsPopupOpen}
                />
            ))}

            {connections.map((connection, index) => {
                const startPos = getCardPosition(connection.startId);
                const endPos = getCardPosition(connection.endId);
                if (!startPos || !endPos) return null;
                return (
                    <Connection
                        key={index}
                        startX={startPos.left + 100} // Adjust as per card size
                        startY={startPos.top + 50} // Adjust as per card size
                        endX={endPos.left + 100} // Adjust as per card size
                        endY={endPos.top + 50} // Adjust as per card size
                    />
                );
            })}

            <div className="controls">
                <button
                    onClick={() => setIsPopupOpen(true)}
                    className="control-button"
                >
                    Create Card
                </button>
                {cards.length > 1 && (
                    <button onClick={addConnection} className="control-button">
                        Connect Selected Cards
                    </button>
                )}
            </div>

            {isPopupOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add a new card</h3>
                        <input
                            type="text"
                            value={newCardText}
                            onChange={(e) => setNewCardText(e.target.value)}
                            placeholder="Enter card text..."
                        />
                        <div className="modal-actions">
                            <button onClick={handleAddCard}>Add Card</button>
                            <button onClick={() => setIsPopupOpen(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Canvas;
