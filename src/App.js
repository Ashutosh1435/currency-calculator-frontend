import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [topCurrencies, setTopCurrencies] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [amount, setAmount] = useState('');
  const [supportedCurrencies, setSupportedCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  useEffect(() => {
    fetchTopCurrencies();
    fetchSupportedCurrencies()
  }, []);

  const fetchTopCurrencies = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/topCurrencies');
      const data = await response.json();
      setTopCurrencies(data.data);
    } catch (error) {
      console.error('Error fetching top currencies:', error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedCrypto(event.target.value);
    // Perform any desired action when a cryptocurrency is selected
    alert(`You selected: ${event.target.value}`);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };
  const fetchSupportedCurrencies = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/supportedCurrencies');
      const data = await response.json();
      setSupportedCurrencies(data);
    } catch (error) {
      console.error('Error fetching supported currencies:', error);
    }
  };

  const handleConvertCurrency = async () => {
    const response = await fetch(`http://localhost:4000/api/convertCurrency?cryptoSymbol=${selectedCrypto}&targetCurrency=${selectedCurrency}&amount=${amount}`)
    const data = await response.json();
    console.log(data)
  };


  return (
    <>
      <div class="font-manrope flex h-screen w-full items-center justify-center">
        <div class="mx-auto box-border w-[365px] border bg-white p-4">
          <select value={selectedCrypto} onChange={handleSelectChange} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            <option value="" disabled>Select a cryptocurrency</option>
            {topCurrencies?.map(crypto => (
              <option key={crypto.id} value={crypto.name}>
                {crypto.name}
              </option>
            ))}
          </select>
          <div class="mt-6">
            <div class="font-semibold">How much would you like to convert?</div>
            <div>
              <input type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
                class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2" />
            </div>

          </div>

          <div class="mt-6">
            <div class="font-semibold">From</div>
            <select value={selectedCurrency} onChange={handleCurrencyChange} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option value="" disabled>Select a Currency</option>
              {supportedCurrencies?.map((currency, id) => (
                <option key={crypto.id} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div class="mt-6">
            <button onClick={handleConvertCurrency} class="w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white">Convert Currency</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
