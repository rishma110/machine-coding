const main = () => {
  let app = document.getElementById("app");
  let myDiv = document.createElement("div");
  myDiv.setAttribute("class", "myDiv");
  myDiv.innerText = "hello";
  app.appendChild(myDiv);
};

const onTextEntered = (e) => {
  let userVal = e.target.value;
  let myLis = document.getElementById("mySelect").getElementsByTagName("li");
  arr;
  console.log(myLis[0].innerText);
};

const showAllClick = (e) => {
  console.log("clicked");
  let mySelect1 = document.getElementById("mySelect");
  let displayVal = window
    .getComputedStyle(mySelect1)
    .getPropertyValue("display");
  if (displayVal === "none") {
    mySelect1.setAttribute("class", "visible");
  } else {
    mySelect1.setAttribute("class", "mySelect");
  }
};

document.addEventListener("DOMContentLoaded", main);
let myInput = document.getElementById("myInput");
myInput.addEventListener("change", debounce(onTextEntered, 3000));
let showAll = document.getElementById("showAll");
showAll.addEventListener("click", showAllClick);
