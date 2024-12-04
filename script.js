let input = document.getElementsByClassName("display-screen")[0];
let buttons = document.querySelectorAll("button");
let string = "";
let arr = Array.from(buttons);
let greatest_key = 1;
window.onload = () => {
  input.value = "";
  let history = document.getElementsByClassName("history")[0];
  let keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i));
  }
  keys.sort((a, b) => a - b);
  greatest_key = keys[keys.length - 1];
  keys.forEach((key) => {
    let expObj = JSON.parse(localStorage.getItem(key));
    let historyDiv = document.createElement("div");
    historyDiv.innerHTML = `${key} : ${expObj.expression}`;
    history.appendChild(historyDiv);
  });
};
arr.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerHTML == "=") {
      const expObj = {
        expression : string,
      };
      let historyDiv = document.createElement("div");
      historyDiv.innerHTML = string;
      string = eval(string);
      expObj.expression += " = " + string;
      let new_key= greatest_key + 1;
      historyDiv.innerHTML = `${new_key}` +":" + historyDiv.innerHTML + " = " + string;
      document.getElementsByClassName('history')[0].appendChild(historyDiv);
      localStorage.setItem(new_key, JSON.stringify(expObj));      
      input.value = string;
    } else if (e.target.innerHTML == "AC") {
      string = "";
      input.value = string;
    } else if (e.target.innerHTML == "Del") {
      string = input.value.substring(0, input.value.length - 1);
      input.value = string;
    } else {
      string += e.target.innerHTML;
      input.value = string;      
    }
  });
});
