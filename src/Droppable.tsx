import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Item, ItemType } from "./ItemTypes";

function getStyle(backgroundColor: string): React.CSSProperties {
  return {
    border: "1px solid rgba(0,0,0,0.2)",
    minHeight: "8rem",
    minWidth: "8rem",
    color: "white",
    backgroundColor,
    padding: "2rem",
    paddingTop: "1rem",
    margin: "1rem",
    textAlign: "center",
    float: "left",
    fontSize: "1rem"
  };
}

export interface DroppableProps {
  id: number;
  path: string;
  item: Item;
  addChildNode: (parent: string, item: Item) => void;
  getChildNodes: (parent: string) => Item[];
}

export interface DroppableState {
  hasDropped: boolean;
  hasDroppedOnChild: boolean;
}

const Droppable: React.FC<DroppableProps> = ({
  path,
  id,
  item,
  addChildNode,
  getChildNodes,
  children
}) => {
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: getAcceptableChildren(item.type),
    drop(droppingItem, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        // Just return if a child has already handled the drop - i.e. didDrop
        return;
      }
      console.log("Dropped Item On", path);
      addChildNode(path, {
        type: droppingItem.type as ItemType,
        props: {},
        children: []
      });
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: false })
    })
  });

  let backgroundColor = "rgba(0, 0, 0, .5)";

  if (isOverCurrent || isOver) {
    backgroundColor = "darkgreen";
  }

  return (
    <div ref={drop} style={getStyle(backgroundColor)}>
      {item.type}
      <br />
      {renderChildren(path, addChildNode, getChildNodes)}
      <div>{children}</div>
    </div>
  );
};

const getAcceptableChildren = (type: string): ItemType[] => {
  switch (type) {
    case "container":
      return ["row"];
    case "row":
      return ["col"];
    case "col":
      return ["card"];
    default:
      return [];
  }
};

const renderChildren = (thisPath, addChildNode, getChildNodes) => {
  return getChildNodes(thisPath).map((child, index) => {
    const childPath = `${thisPath}.children[${index}]`;
    switch (child.type) {
      case "row":
        return (
          <Droppable
            key={index}
            path={childPath}
            id={index}
            item={{ type: "row", props: {}, children: [] }}
            addChildNode={addChildNode}
            getChildNodes={getChildNodes}
          />
        );
      case "col":
        return (
          <Droppable
            key={index}
            path={childPath}
            id={index}
            item={{ type: "col", props: {}, children: [] }}
            addChildNode={addChildNode}
            getChildNodes={getChildNodes}
          />
        );
      case "card":
        return (
          <Droppable
            key={index}
            path={childPath}
            id={index}
            item={{ type: "card", props: {}, children: [] }}
            addChildNode={addChildNode}
            getChildNodes={getChildNodes}
          />
        );
      default:
        return null;
    }
  });
};

export default Droppable;
