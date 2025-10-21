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

function Chart({data, options, loading}) {

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