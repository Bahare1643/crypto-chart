import {Button} from '@/components/ui/button';

function Buttons({coins, activeButton, setActiveButton}) {

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