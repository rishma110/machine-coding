const deleteClick = (e) => {
const val = e.currentTarget.id;
const li = document.getElementById(`li-${val}`);
li.remove();
}

const onCompletedFilter = (e) => {
    let comp = localStorage.getItem("completed"); let completed;
    if(!comp){
        return;
    }
    else {
        completed = JSON.parse(comp);
    }
    const allLi = document.querySelectorAll('.liclass');
    if(e.target.checked){    
        for(let i=0; i<allLi.length; i++){
            const currId = allLi[i].id;
            let currval = currId.split('li-')[1];
            if(completed.indexOf(currval) > -1){
                allLi[i].style.display = '';
            }
            else {
                allLi[i].style.display = 'none';
            }
        }
    }
    else {
        for(let i=0; i<allLi.length; i++){
            allLi[i].style.display = '';
        }
    }
}

const onnameChange = (e) => {
    const val = e.currentTarget.id.split('-in')[0];
    const liEl = document.getElementById(`li-${val}`);
    const text = e.currentTarget.value;
    liEl.setAttribute("id", `li-${text}`);
    const inpeleme = document.getElementById(`${val}-in`);
    inpeleme.setAttribute("id", `${text}-in`);

    const btnele = document.getElementById(val);
    btnele.setAttribute("id", text);

    let comp = localStorage.getItem("completed"); let completed;
    completed = JSON.parse(comp);
    if(completed.indexOf(val)>-1){
        completed.splice(val, 1);
        completed.push(text);
        localStorage.setItem("completed", JSON.stringify(completed));
    }
}

const onCheckboxChange = (e) => {
const val = e.target.id.split('-')[0];
let comp = localStorage.getItem("completed"); let completed;
let data = JSON.parse(localStorage.getItem("data"));
const keys = Object.keys(data);
if(e.target.checked){
    if(comp){
        completed = JSON.parse(comp);
        if(completed.indexOf(val)>-1){

        }
        else{
            completed.push(val);
        }
    }
    else{
        completed = [];
        completed.push(val);
    }
    localStorage.setItem("completed", JSON.stringify(completed));  
    keys.map(key => {
        const keyVals = data[key];
        data[key] = keyVals.map(keyVal => {
            if(keyVal.value === val){
            keyVal.completed = true;
            return keyVal;
            }
        })    
    })
}
else{
    completed = JSON.parse(comp);
    if(completed.indexOf(val)>-1){
        completed.splice(val, 1);
        localStorage.setItem("completed", JSON.stringify(completed));
    }
    keys.map(key => {
        const keyVals = data[key];
        data[key] = keyVals.map(keyVal => {
            if(keyVal.value === val){
               return keyVal.completed = false;
            }
        })    
    })
}
localStorage.setItem("data", JSON.stringify(data));  
}

const createLi = (liEl, value, checked) => {
    
    liEl.setAttribute("id", `li-${value}`);
    liEl.setAttribute("class", 'liclass');
    const outerDiv = document.createElement("div");
    outerDiv.setAttribute("id", "lidiv");
    outerDiv.setAttribute("class", "lidiv");
    liEl.appendChild(outerDiv);

    const inpuEl = document.createElement("input");
    inpuEl.setAttribute("id", `${value}-in`);
    inpuEl.setAttribute("class", "task");
    inpuEl.value = value;
    inpuEl.addEventListener('change', onnameChange);
    outerDiv.appendChild(inpuEl);

    const checkboxEl = document.createElement("input");
    checkboxEl.setAttribute("type", "checkbox");
    checkboxEl.setAttribute("class", "chkbox");
    checkboxEl.setAttribute("id", `${value}-ch`);
    checkboxEl.addEventListener('change', onCheckboxChange);
    checkboxEl.checked = checked;
    outerDiv.appendChild(checkboxEl);

    const btnEl = document.createElement("button");
    btnEl.setAttribute("id", `${value}`);
    btnEl.addEventListener('click', deleteClick);
    btnEl.setAttribute("class", "btn2");
    btnEl.innerText= 'delete';
    outerDiv.appendChild(btnEl);
    
}

const createListItem = (id) => { 
    const ulEl = document.getElementById(`ul-${id}`);
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    return liEl;
}

const addItemClick = (e) => {
const id = e.currentTarget.id; //listName
const liEl = createListItem(id);
const inpEl = document.getElementById(`inp-${id}`);
const value = inpEl.value;

const dta = localStorage.getItem('data'); let newdata ={};
if(dta){
    const data = JSON.parse(dta);
    data[id].push({value, completed: false});
    localStorage.setItem("data", JSON.stringify(data))
}
else{
    newdata[id] = [{value, completed: false}];
    localStorage.setItem("data", JSON.stringify(newdata))
}

if(value){
    createLi(liEl, value, false);
}

}


const addNewList = (listName) => {
    const listcont = document.getElementById("list-cont");
    const listNameP = document.createElement('p');
    listNameP.innerText = listName;
    listcont.appendChild(listNameP);

    const ulElem = document.createElement('ul');
    ulElem.setAttribute("id", `ul-${listName}`);
    ulElem.setAttribute("class", "ul");
    listcont.appendChild(ulElem);

    const divElem = document.createElement('div');
    divElem.setAttribute("id", `addItem-${listName}`);
    divElem.setAttribute("class", "addItem");
    listcont.appendChild(divElem);

    const inputElem = document.createElement("input");
    inputElem.setAttribute("id", `inp-${listName}`);
    divElem.appendChild(inputElem);

    const buttonElem = document.createElement("button");
    buttonElem.setAttribute("id", listName);
    buttonElem.addEventListener('click', addItemClick);
    buttonElem.innerText = '+';
    divElem.appendChild(buttonElem);
}

const addListClick = (e) => {
    if(listNameInpEl.value){
        addNewList(listNameInpEl.value);
    }
    else{
        alert("Need to fill the name of the list")
    }
    
}


const main = () => {
    const localData = localStorage.getItem("data");
    if(localData){
        const lcl = JSON.parse(localData);
        const keys = Object.keys(lcl);
        keys.map(key => {
            addNewList(key);
           const liEl = createListItem(key);
            const vals = lcl[key];
            vals.map(val => {
                createLi(liEl, val.value, val.completed);
            });
        })

    }
}


document.addEventListener('DOMContentLoaded', main);
let listNameInpEl = document.getElementById("listNameInp");
const addListBtnEl = document.getElementById("addListBtn");
addListBtnEl.addEventListener('click', addListClick);
const completedEl = document.getElementById("completed");
completedEl.addEventListener('change', onCompletedFilter)