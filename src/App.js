import './App.css';
import React from "react";
import { useEffect, useState } from "react";
import { SupportedCurrencies } from "./utils";

function App() {
  const [topCurrencies, setTopCurrencies] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [supportedCurrencies, setSupportedCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [result, setResult] = useState();
  const [error, setError] = useState("");
  useEffect(() => {
    fetchTopCurrencies();
    setSupportedCurrencies(SupportedCurrencies);
  }, []);

  const fetchTopCurrencies = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/topCurrencies`
      );
      const data = await response.json();
      setTopCurrencies(data.data);
    } catch (error) {
      console.error("Error fetching top currencies:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedCrypto(event.target.value);
    if (error) setError("");
    if (result) setResult(null);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    if (error) setError("");
    if (result) setResult(null);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
    if (error) setError("");
    if (result) setResult(null);
  };

  const handleConvertCurrency = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/convertCurrency?cryptoSymbol=${selectedCrypto}&targetCurrency=${selectedCurrency}&amount=${amount}`
    );
    const data = await response.json();
    if (data.convertedAmount) {
      setResult(data);
      setError("");
      alert(`Converted Amount : ${data.convertedAmount}`);
    } else
      setError(`Free version of API doesn't support this crypto currency.`);
  };

  return (
    <React.Fragment>
      <div class="font-manrope flex mt-20  justify-center">
        <div class="mx-auto box-border w-[365px] border bg-white p-4">
          <select
            value={selectedCrypto}
            onChange={handleSelectChange}
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option value="" disabled>
              Select a cryptocurrency
            </option>
            {topCurrencies?.map((crypto) => (
              <option key={crypto.id} value={crypto.name}>
                {crypto.name}
              </option>
            ))}
          </select>
          <div class="mt-6">
            <div class="font-semibold">How much would you like to convert?</div>
            <div>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
                class="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
              />
            </div>
          </div>

          <div class="mt-6">
            <div class="font-semibold">From</div>
            <select
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
              <option value="" disabled>
                Select a Currency
              </option>
              {supportedCurrencies?.map((currency, id) => (
                <option key={crypto.id} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div class="mt-6">
            <button
              disabled={!amount || !selectedCrypto || !selectedCurrency}
              onClick={handleConvertCurrency}
              className="btn w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white"
            >
              Convert Currency
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        {error ? (
          <p className="error">{error}</p>
        ) : result ? (
          <p>{"Converted Amount : " + result.convertedAmount}</p>
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default App;
