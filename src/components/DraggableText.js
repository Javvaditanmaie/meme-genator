// components/DraggableText.js
import React, { useState } from "react";
import {
  DndContext,
  useDraggable,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

const DraggableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    position: "absolute",
    top: 50,
    left: 50,
    cursor: "move",
    fontSize: "20px",
    fontWeight: "bold",
    color: "white",
    textShadow: "2px 2px 4px black",
    userSelect: "none",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

const DraggableText = () => {
  const [text, setText] = useState("Double click to edit");
  const [editMode, setEditMode] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext sensors={sensors}>
      <DraggableItem id="text">
        {editMode ? (
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onDoubleClick={() => setEditMode(false)}
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              padding: "2px",
            }}
          />
        ) : (
          <h1 onDoubleClick={() => setEditMode(true)} style={{ margin: 0 }}>
            {text}
          </h1>
        )}
      </DraggableItem>
    </DndContext>
  );
};

export default DraggableText;
