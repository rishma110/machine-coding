let messages = {
  person1: [
    {
      message: "hello hi",
      sent: true,
    },
    {
      message: "hello hi",
      sent: false,
    },
    {
      message: "how are you",
      sent: true,
    },
    {
      message: "I am great what about u",
      sent: false,
    },
    {
      message: "Same Thanku",
      sent: true,
    },
    {
      message: "hey man",
      sent: true,
    },
    {
      message: "hey",
      sent: false,
    },
    {
      message: "how was the movie",
      sent: true,
    },
    {
      message: "Not good",
      sent: false,
    },
    {
      message: "Oh damn",
      sent: true,
    },
    {
      message: "Did you take medicine",
      sent: true,
    },
    {
      message: "No, I will in some time",
      sent: false,
    },
    {
      message: "Alright, do let me know",
      sent: true,
    },
    {
      message: "Sure. Will do",
      sent: false,
    },
    {
      message: "ok",
      sent: true,
    },
  ],
  person2: [
    {
      message: "hey man",
      sent: true,
    },
    {
      message: "hey",
      sent: false,
    },
    {
      message: "how was the movie",
      sent: true,
    },
    {
      message: "Not good",
      sent: false,
    },
    {
      message: "Oh damn",
      sent: true,
    },
  ],
  person3: [
    {
      message: "Did you take medicine",
      sent: true,
    },
    {
      message: "No, I will in some time",
      sent: false,
    },
    {
      message: "Alright, do let me know",
      sent: true,
    },
    {
      message: "Sure. Will do",
      sent: false,
    },
    {
      message: "ok",
      sent: true,
    },
  ],
  person4: [
    {
      message: "have you gotten the grade",
      sent: true,
    },
    {
      message: "no I am scared",
      sent: false,
    },
    {
      message: "Dont be you will pass",
      sent: true,
    },
    {
      message: "Hope for the best",
      sent: true,
    },
    {
      message: "bye",
      sent: true,
    },
  ],
};
const chatObj = (() => {
  class Chat {
    constructor() {
      this.currPerson = "";
      let sendEl = document.getElementById("send");
      sendEl.addEventListener("click", this.sendChat.bind(this));
    }
    sendChat() {
      let inpEl = document.getElementById("textinp");
      let message = inpEl.value;
      this.data[this.currPerson].push({ message, sent: true });
      localStorage.setItem("data", JSON.stringify(this.data));
      this.addData(message);
    }
    addData(msg) {
      let chat = document.getElementById("chatList");
      let liEl = document.createElement("li");
      let pEl = document.createElement("p");
      liEl.setAttribute("class", "chat-li-r");
      pEl.setAttribute("class", "p-right");
      pEl.innerText = msg;
      liEl.appendChild(pEl);
      chat.appendChild(liEl);
      let main = document.getElementById("main");
      main.scrollTop = chat.scrollHeight;
    }
    clearChat() {
      let chat = document.getElementById("chatList");
      chat.innerHTML = "";
    }
    setChatData(per) {
      this.currPerson = per;
      let personalMessages = this.data[per];
      let chat = document.getElementById("chatList");
      var fragment = new DocumentFragment();
      personalMessages.forEach((mes) => {
        let liEl = document.createElement("li");
        liEl.setAttribute("class", "chat-li");
        let pEl = document.createElement("p");
        if (mes.sent) {
          liEl.setAttribute("class", "chat-li-r");
          pEl.setAttribute("class", "p-right");
        } else {
          pEl.setAttribute("class", "p-left");
        }
        pEl.innerText = mes.message;

        liEl.appendChild(pEl);
        fragment.appendChild(liEl);
      });
      chat.appendChild(fragment);
      let main = document.getElementById("main");
      main.scrollTop = chat.scrollHeight;
    }
    createPeopleList() {
      let persons = Object.keys(this.data);
      let ulEl = document.getElementById("chatrooms");
      persons.forEach((per) => {
        let liEl = document.createElement("li");
        liEl.setAttribute("class", "li");
        liEl.onclick = () => {
          this.clearChat();
          this.setChatData(per);
        };
        liEl.innerText = per;
        ulEl.appendChild(liEl);
      });
    }
    setData(data) {
      this.data = data;
      localStorage.setItem("data", JSON.stringify(data));
      this.createPeopleList();
    }
    getData() {
      this.setData(messages);
    }
  }

  return new Chat();
})();

const main = () => {
  let cdata = JSON.parse(localStorage.getItem("data"));
  if (!cdata) {
    chatObj.getData();
  } else {
    chatObj.setData(cdata);
  }
};

document.addEventListener("DOMContentLoaded", main);
