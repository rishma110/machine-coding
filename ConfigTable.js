//https://accounts.google.com/ServiceLogin?service=wise&passive=1209600&continue=https://docs.google.com/document/u/1/d/12hVQzqvA5vff3bFi6fuMknInsJP5W9V0tassjYcSs-Q/edit&followup=https://docs.google.com/document/u/1/d/12hVQzqvA5vff3bFi6fuMknInsJP5W9V0tassjYcSs-Q/edit&ltmpl=docs&authuser=1#heading=h.p84quntgop0p
const infoObj = (() => {
  class Info {
    constructor(data) {
      this.tabledata = data;
      let searchEl = document.getElementById("search");
      searchEl.addEventListener("keyup", this.search.bind(this));
      let showselEl = document.getElementById("showsel");
      showselEl.addEventListener("change", this.selectedValues.bind(this));
    }

    selectedValues(e) {
      let isSelected = e.target.checked;
      let allTr = document.getElementsByClassName("tr");
      let whiteListed = [];
      this.tabledata.config.forEach((d) => {
        let labelval = d.selected;
        if (isSelected) {
          if (labelval) {
            whiteListed.push(d.key);
          }
        } else {
          whiteListed.push(d.key);
        }
      });
      for (let i = 0; i < allTr.length; i++) {
        if (whiteListed.indexOf(allTr[i].id) > -1) {
          allTr[i].style.display = "";
        } else {
          allTr[i].style.display = "none";
        }
      }
    }

    search(e) {
      let val = e.target.value.toLowerCase();
      let allTr = document.getElementsByClassName("tr");
      let whiteListed = [];
      this.tabledata.config.forEach((d) => {
        let labelval = d.label.toLowerCase();
        if (labelval.indexOf(val) > -1) {
          whiteListed.push(d.key);
        }
      });
      for (let i = 0; i < allTr.length; i++) {
        if (whiteListed.indexOf(allTr[i].id) > -1) {
          allTr[i].style.display = "";
        } else {
          allTr[i].style.display = "none";
        }
      }
    }

    createCol() {
      let td = document.createElement("td");
      td.setAttribute("class", "td");
      return td;
    }

    createCheckBox(data) {
      let td = this.createCol();
      let inp = document.createElement("input");
      inp.setAttribute("type", "checkbox");
      inp.checked = data.selected;
      inp.setAttribute("selected", data.selected);
      inp.onclick = (e) => {
        let ldata = this.tabledata;
        ldata.config = ldata.config.map((edata) => {
          if (edata.key === data.key) {
            edata.selected = !edata.selected;
          }
          return edata;
        });
        console.log(ldata);
        let fieldEl = document.getElementById(`field-${data.key}`);
        fieldEl.disabled = !fieldEl.disabled;
        this.tabledata = ldata;
      };

      td.appendChild(inp);
      return td;
    }

    createKey(data) {
      let td = this.createCol();
      let key = document.createElement("p");
      key.innerText = data.label;
      td.appendChild(key);
      return td;
    }

    createDesc(data) {
      let td = this.createCol();
      let desc = document.createElement("p");
      desc.innerText = data.description;
      td.appendChild(desc);
      return td;
    }
    createSelect(data) {
      let sel = document.createElement("select");
      sel.setAttribute("id", `field-${data.key}`);
      let options = data.field.options;
      let def = data.field.defaultValue;
      options.forEach((op) => {
        let childOp = document.createElement("option");
        if (def === op) {
          childOp.selected = true;
        }
        childOp.innerText = op;
        sel.appendChild(childOp);
      });
      sel.disabled = !data.selected;
      sel.onchange = (e) => {
        let val = e.target.value;
      };
      return sel;
    }

    createInputText(data) {
      let inp = document.createElement("input");
      inp.setAttribute("id", `field-${data.key}`);
      inp.disabled = !data.selected;
      inp.value = data.field.defaultValue;
      return inp;
    }

    createField(data) {
      let td = this.createCol();
      let type = data.field.type;
      let child;
      switch (type) {
        case "text":
          child = this.createInputText(data);
          break;
        case "select":
          child = this.createSelect(data);
          break;
      }
      td.appendChild(child);
      return td;
    }

    createRow(data) {
      let tr = document.createElement("tr");
      tr.setAttribute("class", "tr");
      tr.setAttribute("id", data.key);
      tr.appendChild(this.createCheckBox(data));
      tr.appendChild(this.createKey(data));
      tr.appendChild(this.createField(data));
      tr.appendChild(this.createDesc(data));
      return tr;
    }

    setData(data) {
      this.tabledata = data;
      let configData = data.config;
      let tbdy = document.getElementById("tbody");
      configData.forEach((elData) => {
        tbdy.appendChild(this.createRow(elData));
      });
    }
    getData() {
      fetch("https://flipkart-configuration-table.now.sh/api")
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("data", JSON.stringify(res));
          this.setData(res);
        });
    }
  }
  return new Info({});
})();

const main = () => {
  let data = JSON.parse(localStorage.getItem("data"));
  if (!data) {
    infoObj.getData();
  } else {
    infoObj.setData(data);
  }
};

document.addEventListener("DOMContentLoaded", main);
