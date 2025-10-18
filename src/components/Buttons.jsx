import axios from 'axios';
import {useEffect} from 'react';
import {Button} from '@/components/ui/button';

import Chart from './Chart';


function Buttons({years, coins, prices, setPrices, activeButton, setActiveButton, loading, setLoading}) {

  async function getPrices(coin) {
    setLoading(true);
    try{
      const allPrices = [];

      for (let i = 0; i < years.length; i+=2) {
        const from = Math.floor(new Date(years[i]).getTime() / 1000);
        const nextDay = Math.floor(new Date(years[i+1]).getTime() / 1000);
        const url = `https://apiv2.nobitex.ir/market/udf/history?symbol=${coin.symbol}&resolution=D&from=${from}&to=${nextDay}`;
        const response = await axios.get(url);
        const data = response.data;

        if (data && data.c && data.c.length > 0) {
          const yearPrice = data.c[0];
          allPrices.push(yearPrice);
        } else {
          allPrices.push(null);
        }        
      }

      setPrices(allPrices);
      setLoading(false);
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getPrices(activeButton);
  }, [activeButton]);

  return(    
      <div className="flex gap-2 rounded-full bg-[#292929] px-3 py-1">
        {coins.map((coin) => (
          <Button
            key={coin.symbol}
            onClick={() => setActiveButton(coin)}
            variant="ghost"
            className={`rounded-full px-4 py-1 ${
              activeButton.symbol === coin.symbol ? "bg-[#538e6a] text-white hover:bg-[#538e6a] hover:text-white" : "hover:text-black"
            }`}
          >
            {coin.name}
          </Button>
        ))}
      </div>
  );
};

export default Buttons;