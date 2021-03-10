const data = ["hi", "hello", "happy", "hey"];
const obj = (() => {
  class App {
    constructor() {}

    createImageConatiner() {
      let imgcontainer = document.getElementById("img-container");
      let width = window.innerWidth - 10;

      [1, 2, 3, 4, 5].forEach((d, index) => {
        let liEl = document.createElement("li");
        liEl.setAttribute("class", "li-img");
        liEl.setAttribute("id", `li-${index}`);
        liEl.style.left = index * width + "px";
        // liEl.setAttribute("left", index * width);
        let imgEl = document.createElement("img");
        imgEl.setAttribute("src", "https://via.placeholder.com/" + width);
        liEl.appendChild(imgEl);
        imgcontainer.appendChild(liEl);
      });

      //if(scrolled to the end){
      //the first item's left += index*width;
      //}
    }

    setData() {
      let imgcontainer = document.getElementById("img-container");
      let width = window.innerWidth;

      this.createImageConatiner();
      let list = document.getElementById("ul");
      data.forEach((d, index) => {
        let liEl = document.createElement("li");
        liEl.setAttribute("id", index);
        liEl.setAttribute("class", "li");
        liEl.innerText = "*";
        liEl.onclick = (e) => {
          let id = e.target.id;
          imgcontainer.scrollTo(index * width, 0);
          let counter = 0;
          if (index === 4) {
            let liElimg = document.getElementById(`li-${counter}`);
            //liElimg.setAttribute("left", width * index + 1);
            liElimg.style.left = index.width + "px";
            counter++;
            if (counter === 6) {
              counter = 0;
            }
            imgcontainer.appendChild(liElimg);
          }
          //swiping
        };
        list.appendChild(liEl);
      });
    }
  }

  return new App();
})();

const main = () => {
  //let cdata = JSON.parse(localStorage.getItem("data"));
  obj.setData();
};

document.addEventListener("DOMContentLoaded", main);
