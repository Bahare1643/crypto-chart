import {Line} from "react-chartjs-2";
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler,} from "chart.js";
import {Card, CardContent} from "@/components/ui/card"

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Chart({prices, activeButton, loading}) {

  const labels = [2020, 2021, 2022, 2023, 2024, 2025];
  const data = {
    labels: labels,
    datasets: [
      {
        label: activeButton.name,
        data: prices,
        borderColor: "#538e6a",
        tension: 0.3,
        fill: true,
        backgroundColor: "rgba(83, 141, 105, 0.2)",
        pointBackgroundColor: "#538e6a",
        // Glow
        pointStyle: 'circle',
        pointBorderWidth: 10,
        pointBorderColor: "#538e6a56",
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        border: {
          dash: [5,5],
          display: true,
        },
        grid: {
          color: "rgba(87, 84, 84, 0.26)",
          drawTicks: false,
          borderDashOffset: 0, 
        },
        offset: true,
        ticks: { color: "#9ca3af" },
        beginAtZero: true,
      },
      y: {
        border: {
          dash: [5, 5],
          display: true,
        },
        grid: {
          color: "rgba(87, 84, 84, 0.26)",
          drawTicks: false,
          drawBorder: true,
        },
        ticks: { color: "#9ca3af" },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {display: false},
    },
  };

  return(
    <Card className="bg-[#1b1b1b] border-none shadow-none">
      <CardContent>
        {loading ? 
          <p className="text-center text-gray-400">Loading ...</p> : 
          <Line data={data} options={options} />
        }
      </CardContent>
    </Card>
  );
};

export default Chart;