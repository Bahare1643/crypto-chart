import {useState, useEffect} from 'react';
import axios from 'axios';

import Buttons from './components/Buttons';
import Chart from './components/Chart';

function App() {

  const coins = [
    {name: "Bitcoin", symbol: "BTCIRT"},
    {name: "Tether", symbol: "USDTIRT"},
    {name: "Dai", symbol:"DAIIRT"},
    {name: "Sol", symbol:"SOLIRT"},
  ];

  const [prices, setPrices] = useState([]);
  const [hours, setHours] = useState([]);
  const [activeButton, setActiveButton] = useState(coins[0]);
  const [loading, setLoading] = useState(false);

  

  async function getPrices(coin) {
    setLoading(true);

    const hoursArr = [];

    try{
    const url = `https://apiv2.nobitex.ir/market/udf/history?symbol=${coin.symbol}&resolution=60&from=1704067200&to=1704153600`;
    const response = await axios.get(url);
    const data = response.data;

    const oneDayHours = data.t;
    oneDayHours.map((t) => {
      const candleTime = new Date(t * 1000);
      hoursArr.push(candleTime.getHours());
      return hoursArr;
    });

    setPrices(data.c);
    setHours(hoursArr);
    setLoading(false);

    } catch(error) {
      console.error("Error:", error)
    }
  };

  console.log(hours);

  const labels = hours;
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

  useEffect(() => {
    getPrices(activeButton);
  }, [activeButton]);

  return(
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-[#1b1b1b] text-white p-4">
      <Buttons coins={coins} activeButton={activeButton} setActiveButton={setActiveButton} />
      <div className="w-full max-w-3xl">
        <Chart data={data} options={options} loading={loading}/>
      </div>
    </div>
  );
};

export default App;