import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

// components
import Buttons from './components/Buttons';
import Chart from './components/Chart';
import ShamsiCalendar from './components/ShamsiCalendar';

// function
import jalaaliToGregorian from './components/JalaaliToGregorian.jsx';

function App() {

  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const dates = {
    1: "2024-01-01", 
    2: "2024-01-02", 
    3: "2024-01-03", 
    4: "2024-01-04", 
    5: "2024-01-05", 
    6: "2024-01-06", 
    7: "2024-01-07", 
    8: "2024-01-08", 
    9: "2024-01-09", 
    10: "2024-01-10",
  };

  const persianDates = {
    1: "۱۴۰۲-۱۰-۱۱", 
    2: "۱۴۰۲-۱۰-۱۲",
    3: "۱۴۰۲-۱۰-۱۳", 
    4: "۱۴۰۲-۱۰-۱۴", 
    5: "۱۴۰۲-۱۰-۱۵", 
    6: "۱۴۰۲-۱۰-۱۶", 
    7: "۱۴۰۲-۱۰-۱۷", 
    8: "۱۴۰۲-۱۰-۱۸", 
    9: "۱۴۰۲-۱۰-۱۹", 
    10: "۱۴۰۲-۱۰-۲۰",
  };

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
  const [theDay, setTheDay] = useState(dates[1]);

  const getTheDay = (value) => {
    const selectedDate = value.format("YYYY-MM-DD");
    const gregorianDate = jalaaliToGregorian(selectedDate);
    
    const foundKey = Object.keys(dates).find((k) => dates[k] === gregorianDate);
    // console.log(foundKey)
    if (foundKey) {
      setTheDay(Number(foundKey))
    } else {
      // setTheDay(1)
      // I should write another component that says the data is not found

      console.log('no data')
    }
  };

  function getPrices(coin, currentDay) {
    setLoading(true);

    try{
      const hoursArr = [];
      
      let url = '';
      async function showData(dayNumber) {
        const from = new Date(dates[dayNumber]).getTime() / 1000;
        const to = new Date(dates[dayNumber + 1]).getTime() / 1000;
        url = `https://apiv2.nobitex.ir/market/udf/history?symbol=${coin.symbol}&resolution=60&from=${from}&to=${to}`;
        const response = await axios.get(url);
        const data = response.data;

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
      }

      if (days.includes(currentDay) && currentDay !== 10) {
        showData(currentDay);
      } else {
        showData(1);
      }
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
    getPrices(activeButton, theDay);
  }, [activeButton, theDay]);

  return(
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-[#1b1b1b] text-white p-4">
      <ShamsiCalendar days={days} persianDates={persianDates} theDay={theDay} getTheDay={getTheDay}/>
      <Buttons coins={coins} activeButton={activeButton} setActiveButton={setActiveButton} />
      <div className="w-full max-w-3xl">
        <Chart data={data} options={options} loading={loading}/>
      </div>
    </div>
  );
};

export default App;