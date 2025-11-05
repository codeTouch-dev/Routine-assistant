const clickerBtn = document.querySelector('.controls__button')
const clickerBalance = document.querySelector('.controls__balance span')

const autom1Qty = document.querySelector('.upgrades__element--1 .upgrades__bought')
const autom1BuyBtn = document.querySelector('.upgrades__element--1 .upgrades__buy-btn')
const autom1Price = document.querySelector('.upgrades__element--1 .upgrades__buy-btn span')

const autom2Qty = document.querySelector('.upgrades__element--2 .upgrades__bought')
const autom2BuyBtn = document.querySelector('.upgrades__element--2 .upgrades__buy-btn')
const autom2Price = document.querySelector('.upgrades__element--2 .upgrades__buy-btn span')

const autom3Qty = document.querySelector('.upgrades__element--3 .upgrades__bought')
const autom3BuyBtn = document.querySelector('.upgrades__element--3 .upgrades__buy-btn')
const autom3Price = document.querySelector('.upgrades__element--3 .upgrades__buy-btn span')

const autom4Qty = document.querySelector('.upgrades__element--4 .upgrades__bought')
const autom4BuyBtn = document.querySelector('.upgrades__element--4 .upgrades__buy-btn')
const autom4Price = document.querySelector('.upgrades__element--4 .upgrades__buy-btn span')

const autom5Qty = document.querySelector('.upgrades__element--5 .upgrades__bought')
const autom5BuyBtn = document.querySelector('.upgrades__element--5 .upgrades__buy-btn')
const autom5Price = document.querySelector('.upgrades__element--5 .upgrades__buy-btn span')

let i = 0;

loadProgress();

setInterval(() => {
  let clickerBalNum = Number(clickerBalance.innerText) + i
  clickerBalance.innerText = Number(clickerBalNum.toFixed(1))
}, 1000);



document.addEventListener('click', (event) => {

  const target = event.target
  let clickerBalanceNum = Number(clickerBalance.innerText)
  function buyUpgrade(target) {

    let automCurrentPrice = Number(target.querySelector('span').innerText)
    if (clickerBalanceNum >= automCurrentPrice) {
      clickerBalance.innerText = clickerBalanceNum - automCurrentPrice
      let currentAutomQty = Number(target.parentElement.querySelector('.upgrades__bought').innerText)
      target.parentElement.querySelector('.upgrades__bought').innerText = currentAutomQty + 1
      target.querySelector('span').innerText = Math.round(automCurrentPrice + automCurrentPrice * 0.1)
      // console.log(target.parentElement);

      if (target.parentElement.classList.contains('upgrades__element--1')) {
        i = i + 0.1
      } else if (target.parentElement.classList.contains('upgrades__element--2')) {
        i = i + 1
      } else if (target.parentElement.classList.contains('upgrades__element--3')) {
        i = i + 10
      } else if (target.parentElement.classList.contains('upgrades__element--4')) {
        i = i + 100
      } else if (target.parentElement.classList.contains('upgrades__element--5')) {
        i = i + 1000
      }


      console.log('success');
    } else {
      console.log('not enough funds');
      return
    }
  }

  if (target === clickerBtn) {
    clickerBalance.innerText = clickerBalanceNum + 1

  } else if (
    target === autom1BuyBtn ||
    target === autom2BuyBtn ||
    target === autom3BuyBtn ||
    target === autom4BuyBtn ||
    target === autom5BuyBtn
  ) {
    buyUpgrade(target)



  } else if (
    target.parentElement === autom1BuyBtn ||
    target.parentElement === autom2BuyBtn ||
    target.parentElement === autom3BuyBtn ||
    target.parentElement === autom4BuyBtn ||
    target.parentElement === autom5BuyBtn
  ) {
    buyUpgrade(target.parentElement)



  }



})


function saveProgress() {
  const state = {
    balance: Number(clickerBalance.innerText),
    automQty: [
      Number(autom1Qty.innerText),
      Number(autom2Qty.innerText),
      Number(autom3Qty.innerText),
      Number(autom4Qty.innerText),
      Number(autom5Qty.innerText)
    ],
    prices: [
      Number(autom1Price.innerText),
      Number(autom2Price.innerText),
      Number(autom3Price.innerText),
      Number(autom4Price.innerText),
      Number(autom5Price.innerText)
    ],
    incomePerSec: i
  };
  localStorage.setItem("clickerSave", JSON.stringify(state));
}

function loadProgress() {
  const saved = localStorage.getItem("clickerSave");
  if (!saved) return;

  const state = JSON.parse(saved);

  clickerBalance.innerText = state.balance;
  autom1Qty.innerText = state.automQty[0];
  autom2Qty.innerText = state.automQty[1];
  autom3Qty.innerText = state.automQty[2];
  autom4Qty.innerText = state.automQty[3];
  autom5Qty.innerText = state.automQty[4];

  autom1Price.innerText = state.prices[0];
  autom2Price.innerText = state.prices[1];
  autom3Price.innerText = state.prices[2];
  autom4Price.innerText = state.prices[3];
  autom5Price.innerText = state.prices[4];

  i = state.incomePerSec;
}

// Автосохранение каждую секунду
setInterval(() => {
  saveProgress();
}, 1000);