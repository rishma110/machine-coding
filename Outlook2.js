const maildata = {
  email: [
    {
      mailID: "1",
      from: "Hira",
      to: "Ziv",
      subject: "Hello from this side",
      body:
        "The event loop concept is very simple. There’s an endless loop, where the JavaScript engine waits for tasks, executes them and then sleeps, waiting for more tasks.The general algorithm of the engine:While there are tasks:execute them, starting with the oldest task.",
      time: 1000000,
    },
    {
      mailID: "2",
      from: "Gita",
      to: "Sita",
      subject: "Sita Gita chat",
      body:
        "For instance, while the engine is busy executing a script, a user may move their mouse causing mousemove, and setTimeout may be due and so on, these tasks form a queue, as illustrated on the picture above.",
      time: 1000000,
    },
    {
      mailID: "3",
      from: "Veeru",
      to: "Shiv",
      subject: "Veeru and Shiv Chat--Personal",
      body:
        "Tasks from the queue are processed on “first come – first served” basis. When the engine browser is done with the script, it handles mousemove event, then setTimeout handler, and so on.",
      time: 1000000,
    },
    {
      mailID: "4",
      from: "Kiara",
      to: "Kresha",
      subject: "KK talks",
      body:
        "Rendering never happens while the engine executes a task. It doesn’t matter if the task takes a long time. Changes to the DOM are painted only after the task is complete.",
      time: 1000000,
    },
    {
      mailID: "5",
      from: "Prerna",
      to: "Priya",
      subject: "P to P",
      body:
        "If a task takes too long, the browser can’t do other tasks, such as processing user events. So after a time, it raises an alert like “Page Unresponsive”, suggesting killing the task with the whole page. That happens when there are a lot of complex calculations or a programming error leading to an infinite loop",
      time: 1000000,
    },
    {
      mailID: "6",
      from: "Hira",
      to: "Ziv",
      subject: "Hello from this side",
      body:
        "For example, syntax-highlighting (used to colorize code examples on this page) is quite CPU-heavy. To highlight the code, it performs the analysis, creates many colored elements, adds them to the document – for a large amount of text that takes a lot of time.",
      time: 1000000,
    },
  ],
};

const eObj = (() => {
  class Mail {
    constructor() {
      this.emailData = {};
      let read = document.getElementById("read");
      read.onclick = this.readClick.bind(this);
      let unread = document.getElementById("unread");
      unread.onclick = this.unreadClick.bind(this);
      let fav = document.getElementById("fav");
      fav.onclick = this.favClick.bind(this);
    }

    unreadClick() {
      let read = JSON.parse(localStorage.getItem("read"));
      this.emailData.forEach(({ mailID }) => {
        if (read.indexOf(mailID) > -1) {
          let liEl = document.getElementById(`li-${mailID}`);
          liEl.style.display = "none";
        } else {
          let liEl = document.getElementById(`li-${mailID}`);
          liEl.style.display = "";
        }
      });
    }

    favClick() {}

    readClick() {
      let unread = JSON.parse(localStorage.getItem("unread"));
      this.emailData.forEach(({ mailID }) => {
        if (unread.indexOf(mailID) > -1) {
          let liEl = document.getElementById(`li-${mailID}`);
          liEl.style.display = "none";
        } else {
          let liEl = document.getElementById(`li-${mailID}`);
          liEl.style.display = "";
        }
      });
    }

    setReadData(id) {
      let read = JSON.parse(localStorage.getItem("read"));
      let unread = JSON.parse(localStorage.getItem("unread"));
      let ind = unread.length && unread.indexOf(id);
      if (ind > -1) {
        unread.splice(ind, 1);
        localStorage.setItem("unread", JSON.stringify(unread));
      }
      if (read.indexOf(id) === -1) {
        read.push(id);
      }
      localStorage.setItem("read", JSON.stringify(read));
    }

    createCircle(item) {
      let letter = item.from.slice(0, 1).toUpperCase();
      let divEl = document.createElement("p");
      divEl.setAttribute("class", "circle");
      divEl.innerText = letter;
      return divEl;
    }

    createBodySubject(item) {
      let hEl = document.createElement("h3");
      hEl.innerText = item.subject;
      return hEl;
    }

    createBodyText(item) {
      let p = document.createElement("p");
      p.innerText = item.body;
      return p;
    }

    clearBody() {
      let ebody = document.getElementById("ebody");
      ebody.innerHTML = "";
    }

    createBody(item) {
      let ebody = document.getElementById("ebody");
      ebody.setAttribute("class", "ebody-vis");
      let sec = document.createElement("section");
      sec.setAttribute("class", "sub-sec");
      sec.appendChild(this.createCircle(item));
      sec.appendChild(this.createBodySubject(item));
      ebody.appendChild(sec);
      ebody.appendChild(this.createBodyText(item));
    }

    createListData(item) {
      let el = document.createElement("section");
      el.innerHTML = `<p>From: ${item.from}</p><p>Subject: ${item.subject}</p>`;
      let sec = document.createElement("section");
      sec.setAttribute("class", "sub-sec");
      sec.appendChild(this.createCircle(item));
      sec.appendChild(el);
      return sec;
    }

    setData(data) {
      let listdata = data.email;
      let ulEl = document.getElementById("elist");
      listdata.forEach((item, index) => {
        let lie = document.createElement("li");
        lie.setAttribute("class", "li");
        lie.setAttribute("id", `li-${item.mailID}`);
        lie.onclick = () => {
          this.clearBody();
          this.createBody(item);
          this.setReadData(item.mailID);
        };
        lie.appendChild(this.createListData(item));
        ulEl.appendChild(lie);
      });
    }
  }
  return new Mail();
})();

const getData = () => {
  fetch("https://flipkart-email-mock.now.sh/")
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("data", JSON.stringify(res));
      eObj.setData(res);
    });
};
const main = () => {
  let data = localStorage.getItem("data");
  if (data) {
    data = JSON.parse(data);
    eObj.setData(data);
  } else {
    data = maildata;
    let unread = [];
    data.email.forEach((mail) => {
      unread.push(mail.mailID);
    });
    localStorage.setItem("unread", JSON.stringify(unread));
    localStorage.setItem("read", JSON.stringify([]));
    eObj.emailData = data.email;
    eObj.setData(data);
  }
};
document.addEventListener("DOMContentLoaded", main);
