import {useState} from 'react';

import Buttons from './components/Buttons';
import Chart from './components/Chart';

function App() {

  const years = [
    "2020-01-01", "2020-01-02",
    "2021-01-01", "2021-01-02",
    "2022-01-01", "2022-01-02",
    "2023-01-01", "2023-01-02",
    "2024-01-01", "2024-01-02",
    "2025-01-01", "2025-01-02"
  ];
  const coins = [
    {name: "Bitcoin", symbol: "BTCIRT", years},
    {name: "Tether", symbol: "USDTIRT", years},
    {name: "Dai", symbol:"DAIIRT", years},
    {name: "Sol", symbol:"SOLIRT", years},
  ];

  const [prices, setPrices] = useState([]);
  const [activeButton, setActiveButton] = useState(coins[0]);
  const [loading, setLoading] = useState(false);

  return(
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-[#1b1b1b] text-white p-4">
      <Buttons years={years} coins={coins} prices={prices} setPrices={setPrices} activeButton={activeButton} setActiveButton={setActiveButton} loading={loading} setLoading={setLoading} />
      <div className="w-full max-w-3xl">
        <Chart prices={prices} activeButton={activeButton} loading={loading} />
      </div>
    </div>
  );
};

export default App;