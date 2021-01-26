const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const startDay = days[4];
const dayCount = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};
const calendarObj = (() => {
  class Calendar {
    constructor(data) {
      this.currentMonth = data.currMonth || months[0];
      let prev = document.getElementById("prev");
      let next = document.getElementById("next");
      next.addEventListener("click", this.nextMonth.bind(this));
      prev.addEventListener("click", this.prevMonth.bind(this));
    }

    clearData() {
      let tbody = document.getElementById("tbody");
      tbody.innerHTML = "";
    }
    nextMonth() {
      let ind = months.indexOf(this.currentMonth);
      this.clearData();
      if (ind === 11) {
        this.setData(months[0]);
      } else {
        this.setData(months[ind + 1]);
      }
    }
    prevMonth() {
      let ind = months.indexOf(this.currentMonth);
      this.clearData();
      if (ind === 0) {
        this.setData(months[11]);
      } else {
        this.setData(months[ind - 1]);
      }
    }
    calcStart(month) {
      if (month === months[0]) {
        return days.indexOf(startDay);
      } else {
        let start = days.indexOf(startDay);
        let index = 0;
        months.forEach((mon) => {
          if (mon === month) {
            index = ((start + 1) % 7) - 1;
          } else {
            start = start + dayCount[mon];
          }
        });
        return index;
      }
    }
    constructFirstRow(ind, month) {
      let frow = document.createElement("tr");
      frow.setAttribute("class", "tr");
      let counter = 0;
      let start = 1;
      while (counter <= 6) {
        let td = document.createElement("td");
        td.setAttribute("class", "td");
        if (counter >= ind) {
          start = start + 1;
        }
        if (counter >= ind) {
          td.innerText = start;
        }
        counter++;
        frow.appendChild(td);
      }
      return frow;
    }

    constructRows(ind, month) {
      let col = 1;
      let rows = [];
      while (ind <= dayCount[month]) {
        if (col === 1) {
          let row = document.createElement("tr");
          row.setAttribute("class", "tr");
          while (col <= 7 && ind <= dayCount[month]) {
            let td = document.createElement("td");
            td.setAttribute("class", "td");
            td.innerText = ind;
            ind++;
            col++;
            row.appendChild(td);
          }
          if (col >= 7) col = 1;
          rows.push(row);
        }
      }
      return rows;
    }

    setTitle(month) {
      let titleEl = document.getElementById("month");
      titleEl.innerText = month;
    }

    setData(month) {
      this.setTitle(month);
      let startIndex = this.calcStart(month);
      let tbody = document.getElementById("tbody");
      tbody.appendChild(this.constructFirstRow(startIndex, month));
      startIndex = 7 - startIndex + 1;
      let rows = this.constructRows(startIndex, month);
      rows.forEach((r) => {
        tbody.appendChild(r);
      });
      this.currentMonth = month;
    }
  }

  return new Calendar({ currMonth: months[0] });
})();

const main = () => {
  calendarObj.setData(months[0]);
};

document.addEventListener("DOMContentLoaded", main);
