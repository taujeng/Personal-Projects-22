const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const swapButton = document.getElementById('swap');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const rateDisplay = document.getElementById('rate');



// Fetch exchange rate and update the DOM
function calculate() {
  const firstCurrency = currencyOne.value;
  const secondCurrency = currencyTwo.value;

  // https://v6.exchangerate-api.com/v6/17a52258bbefc13f0d61391d/latest/USD
  // very simple API, just use link, and add currency you want to the end

  fetch(`https://v6.exchangerate-api.com/v6/17a52258bbefc13f0d61391d/latest/${firstCurrency}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
        // from data, what we're interested in is the base, and the conversion rates
      const rate = data.conversion_rates[secondCurrency];
      console.log(rate);
      // this rate updates whenever the 2nd currency selector is changed

      rateDisplay.innerText = `1 ${firstCurrency} = ${rate} ${secondCurrency}`

      amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
}



// Add Event Listeners
currencyOne.addEventListener('change', calculate);
// change event for select lists
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
// input covers both anything user types, and the arrows on the side
amountTwo.addEventListener('input', calculate);

swapButton.addEventListener('click', ()=> {
  const currencySwitch = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = currencySwitch;
  calculate();
})

calculate();

