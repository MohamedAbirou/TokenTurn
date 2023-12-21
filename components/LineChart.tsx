import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

interface LineChartProps {
  sparklineData: number[];
}

const LineChart = ({ sparklineData }: LineChartProps) => {
  const priceChange =
    sparklineData[sparklineData.length - 1] -
    sparklineData[sparklineData.length - 2];
  const lineColor = priceChange >= 0 ? "green" : "red";

  const data = {
    labels: sparklineData,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(131,138,133,0.4)",
        borderColor: lineColor,
        borderCapStyle: "butt" as CanvasLineCap,
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter" as CanvasLineJoin, // Set to a valid value: "round", "miter", or "bevel"
        pointBorderColor: lineColor,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(131,138,133,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: sparklineData,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
        ticks: {
          display: false,
        },
      },
      x: {
        display: false,
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1,
      },
    },
  };

  return (
    <div style={{ width: "150px", height: "70px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
