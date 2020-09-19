import React, {useState, useEffect} from "react";
import Node from "./Node/Node";
import {dijkstra, getNodesInShortestPathOrder} from "../algorithms/dijkstra";

import "./PathfindingVisualizer.scss";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const PathfindingVisualizer = (props) => {
      const [grid, setGrid] = useState([]);
      const [gridStyle, setGridStyle] = useState();
      const [isMousePressed, setMousePressed] = useState(false);

      useEffect(() => {
         getInitialGrid()
      }, []) 

      const getInitialGrid = ( ) => {
         setGrid(() => {
            return [...Array(20)].map((el, col) => [...Array(40)].map((el, row) => (
               createNode(row, col)
               )))
            })
            setGridStyle({
               gridTemplateColumns: `repeat(${40}, 50px)`,
               gridTemplateRows: `repeat(${20}, 50px)`,
            })
         }

      const handleMouseDown = (row, col) => {
         const newGrid = getNewGridWithWallToggled(grid, row, col);
         setGrid(newGrid);
         setMousePressed(true);
      },
      
      handleMouseEnter = (row, col) => {
         if (isMousePressed) {
            const newGrid = getNewGridWithWallToggled(grid, row, col);
            setGrid(newGrid);
         }
      },

      handleMouseUp = () => {
         setMousePressed(false);
      },

      animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
         for (let i = 0; i <= visitedNodesInOrder.length; i++){
            if (i === visitedNodesInOrder.length) {
               setTimeout(() => {
                  animateShortestPath(nodesInShortestPathOrder);
               }, 10 * i);
               return;
            }
            setTimeout(() => {
               const node = visitedNodesInOrder[i]
               document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
            }, 10* i);
         }
      },

      animateShortestPath = (nodesInShortestPathOrder) => {
         for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
               const node = nodesInShortestPathOrder[i]
               document.getElementById(`node-${node.row}-${node.col}`).className = "node node-shortest-path";
            }, 50 * i)
         }
      },
      
      visualizeDijkstra = () => {
         const startNode = grid[START_NODE_ROW][START_NODE_COL];
         const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
         const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
         const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
         animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      }
      
console.log(grid);
      return (
         <>
         <button onClick={() => visualizeDijkstra()}>
            Visualize Dijkstra's Algorithm
         </button>
            <div className="grid" style={gridStyle}>
               {grid.map((row, rowIdx) => {
                  return <div className="row" key={rowIdx}>
                     {row.map((node, nodeIdx) => {
                        const {isStart, isFinish, isWall, row, col} = node;
                        return <Node key={nodeIdx} 
                                                isStart = {isStart} 
                                                isFinish={isFinish} 
                                                isWall={isWall}
                                                onMouseDown={(row, col) => handleMouseDown(row, col)}
                                                onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                                onMouseUp={() => handleMouseUp()}
                                                row={row}
                                                col={col}
                                                />
                     })}
                  </div>
               })}
            </div>
         </>
      );

}



   
   const createNode = (col, row) => {
      return {
         col,
         row,
         isStart: row === START_NODE_ROW && col === START_NODE_COL,
         isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
         distance: Infinity,
         isVisited: false,
         isWall: false,
         previousNode: null
      };
   };

   const getNewGridWithWallToggled = (grid, row, col) => {
      const newGrid = grid.slice();
   const node = newGrid[row][col];
   const newNode = {
      ...node,
      isWall : !node.isWall
   }
   newGrid[row][col] = newNode;
   return newGrid;
}

export default PathfindingVisualizer;