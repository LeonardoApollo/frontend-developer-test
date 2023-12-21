import React, { useEffect, useRef, memo, useState } from "react";
import TimeChart from "timechart";

function createChart(el, xRange, yRange) {
    const data = [];
      for (let x = 0; x < xRange; x++) {
        data.push({ x, y: Math.random() * yRange });
      }
      const chart = new TimeChart(el, {
        series: [{ data, 
          name: 'Graph',
          lineWidth: 2,
        }],
        xRange: { min: 0, max: xRange ?? 100 },
        yRange: { min: 0, max: yRange ?? 100 },
        legend: false, 
      });
      return chart
}

function GraphComponent({ xRange, yRange }) {
  const [isDownload, setIsDownload] = useState(false);
  const chartRef = useRef(null)
  // const canvasRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartRef.current, xRange, yRange)
    return () => chart.dispose()
  }, [xRange, yRange]);

  

  useEffect(() => {
    if(isDownload) {
      // копирование в канвас содержимого Div контейнера невозможно из-за shadowDOM
      // достучаться до canvas элемента библиотеки невозможно из-за shadowDOM
      console.log(chartRef.current.shadowRoot)
    }
  }, [isDownload])

  return <>
  {/* <canvas ref={canvasRef} style={{display: 'none'}}></canvas> */}
  <div ref={chartRef} style={{ width: 400, height: 350, color: "blue" }}></div>
  <button onClick={(e) => setIsDownload(true)} type="button">Download graph as PNG</button>
  </>;
}

export default memo(GraphComponent);