const data = {
  hyderabad: [
    {
      time: 1,
      precipitation: "20%",
      temp: "23*",
    },
    {
      time: 2,
      precipitation: "12%",
      temp: "25*",
    },
    {
      time: 3,
      precipitation: "6%",
      temp: "22*",
    },
    {
      time: 4,
      precipitation: "8%",
      temp: "12*",
    },
    {
      time: 5,
      precipitation: "17%",
      temp: "13*",
    },
    {
      time: 6,
      precipitation: "31%",
      temp: "14*",
    },
    {
      time: 7,
      precipitation: "77%",
      temp: "15*",
    },
    {
      time: 8,
      precipitation: "85%",
      temp: "16*",
    },
    {
      time: 9,
      precipitation: "5%",
      temp: "17*",
    },
  ],
  bangalore: [
    {
      time: 3.5,
      precipitation: "20%",
      temp: "23*",
    },
    {
      time: 4,
      precipitation: "12%",
      temp: "25*",
    },
    {
      time: 4.5,
      precipitation: "6%",
      temp: "22*",
    },
    {
      time: 5,
      precipitation: "8%",
      temp: "12*",
    },
    {
      time: 5.5,
      precipitation: "17%",
      temp: "13*",
    },
    {
      time: 6,
      precipitation: "31%",
      temp: "14*",
    },
    {
      time: 6.5,
      precipitation: "77%",
      temp: "15*",
    },
    {
      time: 8,
      precipitation: "85%",
      temp: "16*",
    },
    {
      time: 9.5,
      precipitation: "5%",
      temp: "17*",
    },
  ],
  delhi: [
    {
      time: 0,
      precipitation: "20%",
      temp: "23*",
    },
    {
      time: 2.5,
      precipitation: "12%",
      temp: "25*",
    },
    {
      time: 3,
      precipitation: "6%",
      temp: "22*",
    },
    {
      time: 4.5,
      precipitation: "8%",
      temp: "12*",
    },
    {
      time: 5,
      precipitation: "17%",
      temp: "13*",
    },
    {
      time: 6.5,
      precipitation: "31%",
      temp: "14*",
    },
    {
      time: 7,
      precipitation: "77%",
      temp: "15*",
    },
    {
      time: 8.5,
      precipitation: "85%",
      temp: "16*",
    },
    {
      time: 9,
      precipitation: "5%",
      temp: "17*",
    },
  ],
  mumbai: [
    {
      time: 1.5,
      precipitation: "20%",
      temp: "23*",
    },
    {
      time: 2,
      precipitation: "12%",
      temp: "25*",
    },
    {
      time: 3.5,
      precipitation: "6%",
      temp: "22*",
    },
    {
      time: 4,
      precipitation: "8%",
      temp: "12*",
    },
    {
      time: 5.5,
      precipitation: "17%",
      temp: "13*",
    },
    {
      time: 6,
      precipitation: "31%",
      temp: "14*",
    },
    {
      time: 7.5,
      precipitation: "77%",
      temp: "15*",
    },
    {
      time: 8,
      precipitation: "85%",
      temp: "16*",
    },
    {
      time: 9.5,
      precipitation: "5%",
      temp: "17*",
    },
  ],
};
const weatherObj = (() => {
  class Weather {
    constructor(data) {
      this.data = {};
      this.location = data.location;
      let selectEl = document.getElementById("select");
      selectEl.addEventListener("change", this.chooseCity.bind(this));
    }
    chooseCity(e) {
      this.location = e.target.value;
      this.clearTable();
      this.setWeatherData(this.data);
    }
    clearTable() {
      let body = document.getElementById("tbody");
      body.innerHTML = "";
    }
    setHeader(data) {
      let selectEl = document.getElementById("select");
      let cities = Object.keys(data);
      cities.forEach((city) => {
        let optEl = document.createElement("option");
        optEl.innerText = city;
        selectEl.appendChild(optEl);
      });
    }

    createRow() {
      let row = document.createElement("tr");
      row.setAttribute("class", "tr");
      return row;
    }

    setWeatherData(data) {
      let ldata = data[this.location];
      let body = document.getElementById("tbody");
      let keys = Object.keys(ldata[0]);
      keys.forEach((key) => {
        let row = this.createRow();
        ldata.forEach((data) => {
          let col = document.createElement("td");
          col.innerText = data[key];
          row.appendChild(col);
        });
        body.appendChild(row);
      });
    }

    setData(data) {
      this.data = data;
      this.setHeader(data);
      this.setWeatherData(data);
    }
    getData() {
      //mocking network call here
      this.data = data;
      localStorage.setItem("wData", JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  return new Weather({ location: "hyderabad" });
})();

const main = () => {
  let data = JSON.parse(localStorage.getItem("wData"));
  if (!data) {
    weatherObj.getData();
  } else {
    weatherObj.setData(data);
  }
};

document.addEventListener("DOMContentLoaded", main);
