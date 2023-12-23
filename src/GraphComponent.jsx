import { Box, Button } from "@mui/material";
import React, { useEffect, useRef, memo, useState } from "react";
import TimeChart from "timechart";

function createChart(el, xRange, yRange) {
  const data = [];
  for (let x = 0; x < xRange; x++) {
    data.push({ x, y: Math.random() * yRange });
  }
  const chart = new TimeChart(el, {
    series: [{ data, name: "Graph", lineWidth: 2 }],
    xRange: { min: 0, max: xRange },
    yRange: { min: 0, max: yRange },
    legend: false,
  });
  return chart;
}

function GraphComponent({ xRange, yRange }) {
  const xAxis = xRange ?? 100;
  const yAxis = yRange ?? 100;
  const [isDownload, setIsDownload] = useState(false);
  const chartRef = useRef(null);
  // const canvasRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, xAxis, yAxis);
    return () => chart.dispose();
  }, [xAxis, yAxis]);

  useEffect(() => {
    if (isDownload) {
      // копирование в канвас содержимого Div контейнера невозможно из-за shadowDOM
      // достучаться до canvas элемента библиотеки невозможно из-за shadowDOM
      console.log(chartRef.current.shadowRoot);
      setIsDownload(false)
    }
  }, [isDownload]);

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      {/* <canvas ref={canvasRef} style={{display: 'none'}}></canvas> */}
      <div
        ref={chartRef}
        style={{ width: 400, height: 350, color: "#5ed3f3" }}
      ></div>
      <Button
        variant="contained"
        onClick={() => setIsDownload(true)}
        type="button"
      >
        Download as PNG/JPEG
      </Button>
    </Box>
  );
}

export default memo(GraphComponent);
