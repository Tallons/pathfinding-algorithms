import React, {useState} from "react";

import "./Node.scss";

const Node = (props) => {
   const {isStart, isFinish, isWall, onMouseDown, onMouseEnter, onMouseUp, row, col } = props;

   const pathClassName = isStart ? "node-start" : isFinish ? "node-finish" : isWall ? "node-wall" : "";

   return (
      <div id={`node-${row}-${col}`} 
               className={`node ${pathClassName}`}
               onMouseDown={() => onMouseDown(row, col)}
               onMouseEnter={() => onMouseEnter(row, col)}
               onMouseUp={() => onMouseUp()}>
      </div>
   )
}
export default Node;