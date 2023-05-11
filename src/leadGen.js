const monthlyIncomeInput = document.getElementById("income");
let monthlyIncome = document.getElementById("income").value;
// console.log("income = " + monthlyIncome);

// const formatter = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   valuta: "USD",
//   minimumFractionDigits: 2,
// });

// function onInput(event) {
//   let value = parseFloat(event.value);
//   if (Number.isNaN(value)) {
//     monthlyIncome.value = "0.00";
//   } else {
//     monthlyIncome.value = value.toFixed(2);
//   }
// }

function onInput(event) {
  let value = parseFloat(event.value);
  if (Number.isNaN(value)) {
    document.getElementById("income").value = "0.00";
  } else {
    document.getElementById("income").value = value.toFixed(2);
  }
}
