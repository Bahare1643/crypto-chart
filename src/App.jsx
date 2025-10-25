import {useState, useEffect} from 'react';
import axios from 'axios';

import Buttons from './components/Buttons';
import Chart from './components/Chart';
import DayPicker from './components/DayPicker';

function App() {

  /*
  2024-01-01 - 1704067200 / 2024-01-02 - 1704153600 / 2024-01-03 - 1704240000 / 2024-01-04 - 1704326400 / 2024-01-05 - 1704412800
  2024-01-06 - 1704499200 / 2024-01-07 - 1704585600 / 2024-01-08 - 1704672000 / 2024-01-09 - 1704758400 / 2024-01-10 - 1704844800
  */
  //const days = [1704067200, 1704153600, 1704240000, 1704326400, 1704412800, 1704499200, 1704585600, 1704672000, 1704758400, 1704844800];
  const days = ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05", "2024-01-06", "2024-01-07", "2024-01-08", "2024-01-09", "2024-01-10"];

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
  const [day, setDay] = useState("2024-01-01");

  const getDay = (event) => {
    setDay(event.target.value);
  };

  async function getPrices(coin) {
    setLoading(true);

    const hoursArr = [];

    try{
      let url = "";
      if (days.includes(day)) {
        const index = days.indexOf(day);
        const from = new Date(day).getTime() / 1000;
        const to = new Date(days[index + 1]).getTime() / 1000;
        url = `https://apiv2.nobitex.ir/market/udf/history?symbol=${coin.symbol}&resolution=60&from=${from}&to=${to}`;
      }
      const response = await axios.get(url);
      const data = response.data;

      const oneDayHours = data.t;
      oneDayHours.map((t) => {
        const candleTime = new Date(t * 1000);
        const candleHour = candleTime.getHours();
        // console.log(typeof(candleHour));
        if (candleHour > 5 && candleHour < 24 || candleHour === 0) {
          console.log(candleHour);
          hoursArr.push(candleHour);
          return hoursArr;
        };
      });

      setPrices(data.c);
      setHours(hoursArr);
      setLoading(false);

    } catch(error) {
      console.error("Error:", error)
    }
  };

  // console.log(hours);

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
  }, [activeButton, day]);

  return(
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-[#1b1b1b] text-white p-4">
      <DayPicker day={day} getDay={getDay}/>
      <Buttons coins={coins} activeButton={activeButton} setActiveButton={setActiveButton} />
      <div className="w-full max-w-3xl">
        <Chart data={data} options={options} loading={loading}/>
      </div>
    </div>
  );
};

export default App;