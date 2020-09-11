const main = document.getElementById("main");
const addUser = document.getElementById("add-user");
const double = document.getElementById("double");
const showMillionaires = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const calculate = document.getElementById("calculate-wealth");

let userData = [];
async function getUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const newUser = {
    name: `${data.results[0].name.first} ${data.results[0].name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  userData.push(newUser);
  updateDom();
}

function updateDom() {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  userData.forEach((user) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${user.name}</strong>${formatMoney(
      user.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(num) {
  return "$" + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function doubleMoney() {
  userData = userData.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

function showMillionaire() {
  userData = userData.filter((user) => user.money > 100000);
  updateDom();
}

function sortRichest() {
  userData.sort((a, b) => a.money - b.money);
  updateDom();
}

function calculateTotal() {
  const total = userData.reduce((acc, user) => {
    return acc += user.money;
  }, 0);
  const element = document.createElement("div");
  element.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
  main.appendChild(element);
}

getUser();
getUser();
getUser();

addUser.addEventListener("click", getUser);
double.addEventListener("click", doubleMoney);
showMillionaires.addEventListener("click", showMillionaire);
sort.addEventListener("click", sortRichest);
calculate.addEventListener("click", calculateTotal);
