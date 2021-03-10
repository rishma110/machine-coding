const cards = {
  0: {
    type: "spade",
    number: "A",
  },
  1: {
    type: "spade",
    number: "K",
  },
  2: {
    type: "spade",
    number: "Q",
  },
  3: {
    type: "spade",
    number: "J",
  },
  4: {
    type: "spade",
    number: "10",
  },
  5: {
    type: "spade",
    number: "9",
  },
  6: {
    type: "spade",
    number: "8",
  },
  7: {
    type: "spade",
    number: "7",
  },
  8: {
    type: "spade",
    number: "6",
  },
  9: {
    type: "spade",
    number: "5",
  },
  10: {
    type: "spade",
    number: "4",
  },
  11: {
    type: "spade",
    number: "3",
  },
  12: {
    type: "spade",
    number: "2",
  },
  13: {
    type: "heart",
    number: "A",
  },
  14: {
    type: "heart",
    number: "K",
  },
  15: {
    type: "heart",
    number: "Q",
  },
  16: {
    type: "heart",
    number: "J",
  },
  17: {
    type: "heart",
    number: "10",
  },
  18: {
    type: "heart",
    number: "9",
  },
  19: {
    type: "heart",
    number: "8",
  },
  20: {
    type: "heart",
    number: "7",
  },
  21: {
    type: "heart",
    number: "6",
  },
  22: {
    type: "heart",
    number: "5",
  },
  23: {
    type: "heart",
    number: "4",
  },
  24: {
    type: "heart",
    number: "3",
  },
  25: {
    type: "heart",
    number: "2",
  },
  26: {
    type: "club",
    number: "A",
  },
  27: {
    type: "club",
    number: "K",
  },
  28: {
    type: "club",
    number: "Q",
  },
  29: {
    type: "club",
    number: "J",
  },
  30: {
    type: "club",
    number: "10",
  },
  31: {
    type: "club",
    number: "9",
  },
  32: {
    type: "club",
    number: "8",
  },
  33: {
    type: "club",
    number: "7",
  },
  34: {
    type: "club",
    number: "6",
  },
  35: {
    type: "club",
    number: "5",
  },
  36: {
    type: "club",
    number: "4",
  },
  37: {
    type: "club",
    number: "3",
  },
  38: {
    type: "club",
    number: "2",
  },
  39: {
    type: "diamond",
    number: "A",
  },
  40: {
    type: "diamond",
    number: "K",
  },
  41: {
    type: "diamond",
    number: "Q",
  },
  42: {
    type: "diamond",
    number: "J",
  },
  43: {
    type: "diamond",
    number: "10",
  },
  44: {
    type: "diamond",
    number: "9",
  },
  45: {
    type: "diamond",
    number: "8",
  },
  46: {
    type: "diamond",
    number: "7",
  },
  47: {
    type: "diamond",
    number: "6",
  },
  48: {
    type: "diamond",
    number: "5",
  },
  49: {
    type: "diamond",
    number: "4",
  },
  50: {
    type: "diamond",
    number: "3",
  },
  51: {
    type: "diamond",
    number: "2",
  },
};
const array = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
];
const main = () => {};
const createCard = (index) => {
  let key = array[index];
  console.log("key", key);
  let cardDetails = cards[key];
  let ulEl = document.getElementById("ulEl");
  let liEl = document.createElement("li");
  if (cardDetails.type === "spade" || cardDetails.type === "club") {
    liEl.setAttribute("class", "li-class-black");
  } else {
    liEl.setAttribute("class", "li-class-red");
  }

  let p1 = document.createElement("p");
  p1.innerText = cardDetails.type;
  let p2 = document.createElement("p");
  p2.innerText = cardDetails.number;
  liEl.appendChild(p1);
  liEl.appendChild(p2);
  ulEl.appendChild(liEl);
};
const showCards = (arr) => {
  arr = arr.sort((a, b) => b - a);
  for (let i = 0; i < arr.length; i++) {
    let index = arr[i];
    console.log("arrindex", index);
    createCard(index);
    delete cards[array[index]];
    array.splice(index, 1);
  }
};
const drawFiveCards = () => {
  let cardsRem = Object.keys(cards);
  let arr = [];
  if (cardsRem <= 0) return;
  if (cardsRem <= 5) {
    showCards(cardsRem);
  } else {
    let counter = 0;
    while (counter < 5) {
      let ind = Math.floor(Math.random() * array.length);
      if (arr.indexOf(ind) < 0) {
        arr.push(ind);
        counter++;
      }
    }
    showCards(arr);
  }
};
document.addEventListener("DOMContentLoaded", main);
let buttonEl = document.getElementById("draw");
buttonEl.addEventListener("click", drawFiveCards);
