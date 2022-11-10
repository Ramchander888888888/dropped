import React, { useState, useEffect, useRef } from "react";
import Droppable from "./Droppable";
import { Row, Col, Card } from "./Widgets";
import { Item } from "./ItemTypes";
import jp from "jsonpath";

const Container: React.FC = () => {
  const containerItem: Item = {
    type: "container",
    props: {},
    children: []
  };

  const [state, setState] = useState<Item[]>([containerItem]);

  const handleClick = e => {};

  const addChildNode = (parent, item) => {
    console.log(`Adding Child of Type ${item.type} to Parent ${parent}`);

    var parentNode = jp.value(state, parent);
    var index = parentNode.children.length;

    const path = `${parent}.children[${index}]`;

    setState(s => {
      var newState = [...s];
      jp.value(newState, path, item);
      console.log("Updated State", newState);
      return newState;
    });
  };

  const getChildNodes = path => {
    // Node object
    var node = jp.value(state, path);

    console.log(`Children for Path ${path}`, node);

    if (node && node.children) {
      return node.children;
    }
    return [];
  };

  console.log("State", state);

  return (
    <div>
      <div style={{ overflow: "hidden", clear: "both", marginTop: "1.5rem" }}>
        <Row />
        <Col />
        <Card />
      </div>

      <div style={{ overflow: "hidden", clear: "both", margin: "-1rem" }}>
        <Droppable
          path={"$[0]"}
          id={0}
          item={containerItem}
          addChildNode={addChildNode}
          getChildNodes={getChildNodes}
        />
      </div>

      <div style={{ overflow: "hidden", clear: "both", marginTop: "1.5rem" }}>
        <button onClick={e => handleClick(e)}>Save Tree</button>
      </div>

      <div style={{ overflow: "hidden", clear: "both", marginTop: "1.5rem" }}>
        {JSON.stringify(state)}
      </div>
    </div>
  );
};

export default Container;
