import { useState } from "react";
import "./App.css";
import GraphComponent from "./GraphComponent";

function App() {
  const [data, setData] = useState([
    { id: 1, xRange: 0, yRange: 0 },
    { id: 2, xRange: 0, yRange: 0 },
    { id: 3, xRange: 0, yRange: 0 },
  ]);

  const inputChangeHandler = (value, id, axis) => {
    setData(
      data.map((graph) => {
        if (graph.id === id) {
          switch (axis) {
            case "x":
              return { ...graph, xRange: value };
            case "y":
              return { ...graph, yRange: value };
            default:
              return graph          
            }
        }
        return graph;
      })
    );
  };

  return (
    <div className="App">
      <div className="container">
        {data.map((graph) => (
          <div key={graph.id} className={`graph__${graph.id}`}>
            <GraphComponent xRange={graph.xRange} yRange={graph.yRange} />
            <label>Coordinates</label>
            <input
              onChange={(e) =>
                inputChangeHandler(e.target.value, graph.id, "x")
              }
              type="number"
              placeholder="xRange"
              title="xRange"
            />
            <input
              onChange={(e) =>
                inputChangeHandler(e.target.value, graph.id, "y")
              }
              type="number"
              placeholder="yRange"
              title="yRange"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;