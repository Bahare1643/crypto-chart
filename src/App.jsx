import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

// components
import Buttons from './components/Buttons';
import Chart from './components/Chart';
import ShamsiCalendar from './components/ShamsiCalendar';
import NotFound from './components/NotFound';

// functions
import jalaaliToGregorian from './components/JalaaliToGregorian.jsx';
import nextDate from './components/NextDay';

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
  const [theDay, setTheDay] = useState("۱۴۰۲-۱۰-۱۱");
  const [notFound, setNotFound] = useState(false);

  const getTheDay = (value) => {
    const selectedDate = value.format("YYYY-MM-DD");
    setTheDay(selectedDate);
  };

  function getPrices(coin) {
    setLoading(true);

    try{
      const hoursArr = [];

      const gregorianDay = jalaaliToGregorian(theDay);
      const nextDay = nextDate(gregorianDay);
      
      let url = '';
      async function showData() {
        const from = new Date(gregorianDay).getTime() / 1000;
        const to = new Date(nextDay).getTime() / 1000;
        url = `https://apiv2.nobitex.ir/market/udf/history?symbol=${coin.symbol}&resolution=60&from=${from}&to=${to}`;
        const response = await axios.get(url);
        const data = response.data;

        if (data.s === "ok") {
          setNotFound(false);
          const oneDayHours = data.t;
          oneDayHours.map((t) => {
            const candleTime = new Date(t * 1000);
            const candleHour = candleTime.getHours();
            if (candleHour > 5 && candleHour < 24 || candleHour === 0) {
              hoursArr.push(candleHour);
              return hoursArr;
            };
          });

          setPrices(data.c);
          setHours(hoursArr);
          setLoading(false);
        } else if (data.s === "no_data") {
          setNotFound(true);
        }
      }

      showData();
    } catch (error) {
      console.error("Error:", error)
    }
  };

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
        backgroundColor: (context) => {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) {
            return null;
          }
          
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(83, 141, 105, 0.4)");
          gradient.addColorStop(1, "rgba(83, 141, 105, 0)");

          return gradient;
        },
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
    getPrices(activeButton, theDay);
  }, [activeButton, theDay]);

  return(
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-[#1b1b1b] text-white p-4">
      <ShamsiCalendar theDay={theDay} getTheDay={getTheDay}/>
      <Buttons coins={coins} activeButton={activeButton} setActiveButton={setActiveButton} />
      <div className="w-full max-w-3xl">
        {notFound ? 
        <NotFound /> :
        <Chart data={data} options={options} loading={loading}/>
        }
      </div>
    </div>
  );
};

export default App;