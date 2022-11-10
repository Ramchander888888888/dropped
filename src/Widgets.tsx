import React from "react";
import { useDrag } from "react-dnd";

const style = {
  display: "inline-block",
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  backgroundColor: "white",
  cursor: "move"
};

export const Row: React.FC = () => {
  const [, drag] = useDrag({ item: { type: "row" } });
  return (
    <div ref={drag} style={style}>
      Row
    </div>
  );
};

export const Col: React.FC = () => {
  const [, drag] = useDrag({ item: { type: "col" } });
  return (
    <div ref={drag} style={style}>
      Col
    </div>
  );
};

export const Card: React.FC = () => {
  const [, drag] = useDrag({ item: { type: "card" } });
  return (
    <div ref={drag} style={style}>
      Card
    </div>
  );
};
