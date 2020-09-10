const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");
const amountOne = document.getElementById("amount-one");
const amountTwo = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculate() {
  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne.value}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currencyTwo.value];
      amountTwo.value = (amountOne.value * rate).toFixed(2);
      rateEl.innerText = `1 ${currencyOne.value} = ${rate} ${currencyTwo.value}`
    });
}

calculate();

currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
amountTwo.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
})

