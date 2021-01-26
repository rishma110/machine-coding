const getData = () => {
    fetch('https://flipkart-email-mock.now.sh/')
    .then(res=>res.json())
    .then(resp => {
        localStorage.setItem("data", JSON.stringify(resp));
        localStorage.setItem("filterData",  JSON.stringify(resp));
        createEmailList(resp);
    })
}

const dateConverter = (time) => {
const date = new Date(time); 
const year = date.getFullYear();
const month = ("0" + (date.getMonth() + 1)).slice(-2);
const day = ("0" + date.getDate()).slice(-2);
const reqDate = `${day}-${month}-${year}`;
return reqDate;
}

const unreadClick = (e) => {
    let data = JSON.parse(localStorage.getItem("data"));
    if(e.target.checked){
        let status = localStorage.getItem("unread");
        let unread = JSON.parse(status);
        data.list = data.list.filter(item => {return unread.indexOf(item.id)>-1});
    }
    createEmailList(data);  
}

const readClick = (e) => {
    let data = JSON.parse(localStorage.getItem("data"));
    if(e.target.checked){
        let status = localStorage.getItem("read");
        let read = JSON.parse(status);
        data.list = data.list.filter(item => {return read.indexOf(item.id)>-1});
    }
    createEmailList(data);
}

const favClick = (e) => {
    let data = JSON.parse(localStorage.getItem("data"));
    if(e.target.checked){
        let status = localStorage.getItem("favorites");
        let read = JSON.parse(status);
        data.list = data.list.filter(item => {return read.indexOf(item.id)>-1});
    }
    createEmailList(data);
}

const createBody = (resp) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const id = resp.id;
    const headerdata = data.list.filter(item => {return item.id === id });
    const html = resp.body;
    const bodyEl = document.getElementById("bodyEl");
    const listEl = document.getElementById("list-container");
    listEl.style.width = '50%';
    bodyEl.style.display = "";
    bodyEl.style.width = '50%';
    const divEl = `<div id="bheader">${headerdata[0].subject} <div id="favbut"> Mark as Fav</div></div>`;
   bodyEl.innerHTML = divEl +  resp.body;
   const favButton = document.getElementById("favbut");
   favButton.addEventListener('click', ()=>{
    let favs = localStorage.getItem("favorites");
    if(favs){
        favs = JSON.parse(favs);
        favorites.push(id);  
    }
    else{
        favs = [];
        favs.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));

   });

}

const getBodyData = (id)=> {
    fetch(`https://flipkart-email-mock.now.sh/?id=${id}`)
    .then(res=> res.json())
    .then(resp=> {
        createBody(resp);
    })
}

const emailClick = (e) =>{
   const emailID =  e.currentTarget.id;
   const ulEl = document.getElementById("ulel");
   getBodyData(emailID);

   const unreadRaw = localStorage.getItem('unread');
   const readRaw = localStorage.getItem('read');
   const unread = JSON.parse(unreadRaw);
   let read;

   //set unread
   const ind = unread.indexOf(emailID);
   if(ind > -1) {
    unread.splice(ind, 1);
    localStorage.setItem('unread', JSON.stringify(unread));
   }
   
   //set read
   if(!readRaw){
    read = [];
    read.push(emailID);
   }
   else{
       read = JSON.parse(readRaw);
       const rind = read.indexOf(emailID);
       if(rind > -1){}
    else {
     read.push(emailID);
    }
   }
   localStorage.setItem('read', JSON.stringify(read)); 
}

const createEmailList = (data) => {
    const list = data.list;
    const total = data.total;
    let unread = localStorage.getItem('status');
    if(!unread){
        unread = [];
        list.map(email => {
            unread.push(email.id);
        });
        
        localStorage.setItem('unread', JSON.stringify(unread));
    }
    const ulEl = document.getElementById("ulel");
    var child = ulEl.lastElementChild;  
        while (child) { 
            ulEl.removeChild(child); 
            child = ulEl.lastElementChild; 
        } 

    list.map(email => {
        let liEl = document.createElement('li');
        liEl.setAttribute("id", email.id);
        liEl.addEventListener("click", emailClick);
        let divEl = document.createElement('div');
        divEl.setAttribute("class", 'emailitem');
        divEl.setAttribute("id", email.id);
        let logo = email.from.name[0].toUpperCase();
        let pEl = document.createElement("p");
        pEl.setAttribute("class", "logo");
        pEl.innerText = logo;
        divEl.appendChild(pEl);
        let divEl2 = document.createElement('div');
        const p1 = document.createElement('p');
        p1.innerText = `From:${email.from.name} ${email.from.email}`;
        const p2 = document.createElement('p');
        p2.innerText = `Subject:${email.subject}`; 
        const p3 = document.createElement('p');
        p3.innerText = `Subject:${email.short_description}`; 
        divEl2.appendChild(p1);
        divEl2.appendChild(p2);
        divEl2.appendChild(p3);
        divEl.appendChild(divEl2);
        liEl.appendChild(divEl);
        ulEl.appendChild(liEl);
    })
}


const main = () => {
    let nwData = localStorage.getItem("data");
    if(!nwData){
       getData(); 
    }
    else{
        createEmailList(JSON.parse(nwData));
    }
}

document.addEventListener('DOMContentLoaded', main);
let unreadEl = document.getElementById("unread")
unreadEl.addEventListener('change', unreadClick);
let readEl = document.getElementById("read")
readEl.addEventListener('change', readClick);
let favEl = document.getElementById("fav")
favEl.addEventListener('change', favClick);