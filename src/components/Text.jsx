import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const Text = ({ val, onChange, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  return (
    <Draggable>
      <div style={{ position: "absolute", cursor: "move" }}>
        {editMode ? (
          <input
            ref={inputRef}
            value={val}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setEditMode(false)}
            style={{
              fontSize: "1.2rem",
              padding: "4px",
              border: "1px solid #444",
              borderRadius: "5px",
              background: "#fff",
            }}
          />
        ) : (
          <h4
            onDoubleClick={() => setEditMode(true)}
            onContextMenu={(e) => {
              e.preventDefault();
              onDelete(); // right-click deletes
            }}
            style={{
               margin: 0,
    padding: "8px 12px",
    background: "rgba(255,255,255,0.75)",
    borderRadius: "10px",
    fontWeight: "bold",
    userSelect: "none",
    fontSize: "28px",        // ⬅️ Increased font size
    color: "#000",           // Optional: make text black
    textShadow: "1px 1px 2px #ccc"
            }}
          >
            {val}
          </h4>
        )}
      </div>
    </Draggable>
  );
};

export default Text;
