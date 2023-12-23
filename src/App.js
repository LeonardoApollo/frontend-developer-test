import { useState } from "react";
import "./App.css";
import GraphComponent from "./GraphComponent";
import Box from "@mui/system/Box";
import Container from "@mui/system/Container";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
function App() {
  const [data, setData] = useState([
    { id: 1, xRange: 0, yRange: 0 },
    { id: 2, xRange: 0, yRange: 0 },
    { id: 3, xRange: 0, yRange: 0 },
  ]);

  const inputChangeHandler = (value, id, axis) => {
    let validatedValue;
    const matchValue = String(value).match(/\d/g);
    if(matchValue) {
      validatedValue = Number(matchValue.join(''))
    }
    setData(
      data.map((graph) => {
        if (graph.id === id) {
          switch (axis) {
            case "x":
              return { ...graph, xRange: validatedValue ?? 0 };
            case "y":
              return { ...graph, yRange: validatedValue ?? 0 };
            default:
              return graph;
          }
        }
        return graph;
      })
    );
  };

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: "#090f11",
        height: "100vh",
      }}
      className="App"
    >
      <Container
        component="main"
        maxWidth="1920px"
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: "30px",
        }}
      >
        {data.map((graph) => (
          <Card
            key={graph.id}
            sx={{
              backgroundColor: "#555",
              border: 2,
              borderRadius: "5px",
              borderColor: "#5ed3f3",
              maxWidth: 400,
            }}
          >
            <GraphComponent xRange={graph.xRange} yRange={graph.yRange} />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Typography color="#dbdbdb" variant="h4" component="h4">
                Coordinates
              </Typography>
              <NumberInput
                min={0}
                onChange={(_, value) =>
                  inputChangeHandler(value, graph.id, "x")
                }
                onInputChange={(e) =>
                  inputChangeHandler(e.target.value, graph.id, "x")
                }
                placeholder="xRange"
                slotProps={{
                  root: { className: "InputRoot" },
                  input: { className: "Input" },
                  incrementButton: {
                    className: "IncrementBtn",
                    children: "▴",
                  },
                  decrementButton: {
                    className: "DecrementBtn",
                    children: "▾",
                  },
                }}
              />
              <NumberInput
                min={0}
                slotProps={{
                  root: { className: "InputRoot" },
                  input: { className: "Input" },
                  incrementButton: {
                    className: "IncrementBtn",
                    children: "▴",
                  },
                  decrementButton: {
                    className: "DecrementBtn",
                    children: "▾",
                  },
                }}
                onChange={(_, value) =>
                  inputChangeHandler(value, graph.id, "y")
                }
                onInputChange={(e) =>
                  inputChangeHandler(e.target.value, graph.id, "y")
                }
                placeholder="yRange"
              />
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
}
export default App;
