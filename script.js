let button = document.querySelector(".buttons");
let display = document.getElementById("display");

let operators = ["+", "-", "/", "*"];
let firstoperand = "";
let secondoperand = "";
let operator = "";

// Handle button clicks
button.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    handleInput(e.target.dataset.value || e.target.innerText.trim());
  }
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  let key = e.key;

  // Allow only valid keys
  if (!isNaN(key) || key === "." || operators.includes(key) || key === "Enter" || key === "Backspace" || key === "Escape") {
    if (key === "Enter") key = "=";
    if (key === "Escape") key = "C";
    if (key === "Backspace") key = "⌫";
    handleInput(key);
  }
});

// Main logic function (shared for both click and keyboard)
function handleInput(value) {
  if (!isNaN(value) || value === ".") {
    if (value === "." && display.innerText.includes(".")) return;
    if (display.innerText === "0" || display.innerText === "Error") display.innerText = "";
    display.innerText += value;
  }

  else if (operators.includes(value)) {
    if (display.innerText.length != 0) {
      firstoperand = display.innerText;
      operator = value;
      display.innerText = "";
    }
  }

  else if (value === "=") {
    if (firstoperand !== "" && operator !== "") {
      secondoperand = display.innerText;
      let result;
      let num1 = parseFloat(firstoperand);
      let num2 = parseFloat(secondoperand);
      switch (operator) {
        case "+": result = num1 + num2; break;
        case "-": result = num1 - num2; break;
        case "*": result = num1 * num2; break;
        case "/": result = num2 !== 0 ? num1 / num2 : "Error"; break;
      }
      display.innerText = result;
      firstoperand = result;
      operator = "";
    }
  }

  else if (value === "C") {
    display.innerText = "0";
    firstoperand = "";
    secondoperand = "";
    operator = "";
  }

  else if (value === "⌫") {
    display.innerText = display.innerText.slice(0, -1);
    if (display.innerText === "" || display.innerText === "Error") {
      display.innerText = "0";
    }
  }
}
