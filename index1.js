const getData = () => {
    
    fetch('https://flipkart-configuration-table.now.sh/api')
    .then(resp => resp.json()).then(response => {
        localStorage.setItem("response", JSON.stringify(response));        
        createTable(response);
    })
}


const createCol = (data) => {   
    const col = document.createElement('td');
    col.setAttribute("class", "t-col");
    col.setAttribute('width', '30%')
    col.innerText = data;
    return col
}

const onInputTextChange = (e) => {
    const value = e.target.value;
    const key = e.target.id;
    tempData.config.map((data)=> {
        if(data.key === key){
           data.label = value;
        }
    });
}

const createInput = (data) => {
    const col = document.createElement('td');
    col.setAttribute("class", "t-col");
    col.setAttribute('width', '30%')
    let input = document.createElement('input');
    input.setAttribute("id", data.key);
    input.addEventListener('change', onInputTextChange)
    input.setAttribute("class", "label")
    input.setAttribute('type', "text");
    input.value = data.label;
    col.appendChild(input);
    return col

}

const createRows = (key) => {
    let table = document.getElementById("t-body");
    const tRow = document.createElement('tr');
    tRow.setAttribute("class","t-rows");
    tRow.setAttribute("id", key);
    table.appendChild(tRow);
    return tRow;
}

const onOptionChange = (e) => {
    const val = e.target.value;
    const key = e.target.id;
    console.log('id', key);
    console.log('val', val);
    tempData.config.map((data)=> {
        if(data.key === key){
           data.field.defaultValue = val;
        }
    });
}

const createSelect = (sdata) => {
    const key = sdata.key;
    const data = sdata.field;
    const headerCol = document.createElement('td');
    headerCol.setAttribute('width', '30%')
    const select = document.createElement('select');
    select.addEventListener('change', onOptionChange);
    select.setAttribute("class", "select");
    select.setAttribute("id", key);
    select.style.fontSize = '42px';
    const defaultVal = data.defaultValue;
    data.options.map(option => {
        let selOp = document.createElement('option');
        if(defaultVal === option){
            selOp.selected = true;
        }
        selOp.innerText = option;
        select.appendChild(selOp);
    });
    headerCol.appendChild(select);
    return headerCol;
}

const onCheckBoxClick = (e) => {
    let key = e.target.id;
    tempData.config.map((data)=> {
        if(data.key === key){
            data.selected = !data.selected;
        }
    })
}


const createCheckBox = (data) => {
    const checkBox = document.createElement('input');
    checkBox.addEventListener('change', onCheckBoxClick);
    checkBox.setAttribute("id", data.key);
    checkBox.setAttribute("class", "check-box");
    checkBox.checked = data.selected;
    checkBox.setAttribute('width', '10%')
    checkBox.setAttribute("type", 'checkbox');
    return checkBox;
}

const createTable = (data) => {
const table = document.getElementById("t-body");
tableData = data;
tempData = tableData;
tableData.config.map((data)=>{
    let createRow = createRows(data.key);
    createRow.appendChild(createCheckBox(data))
    createRow.appendChild(createInput(data));
    if(data.field.type === "text"){
        createRow.appendChild(createCol(data.field.defaultValue));
    }
    else {
        createRow.appendChild(createSelect(data));
    } 
    createRow.appendChild(createCol(data.description))
})
}

const updateLocalStorage = (keys) => {
    tableData = Object.assign({}, tableData, tempData);
    localStorage.setItem("response", JSON.stringify(tableData));
}

const onKeyUp = (e) => {
    let list = tableData.config;
    const targetval = e.target.value.toLowerCase();
    let tRows = document.getElementsByClassName("t-rows");
    for(let i=0; i<tRows.length; i++){
        let input = tRows[i].getElementsByTagName("td")[0].getElementsByTagName("input")[0];
        let text = input.value.toLowerCase();
        if(text.indexOf(targetval)>-1){
            tRows[i].style.display="" 
        }
        else{
            tRows[i].style.display="none";
        }
    }
}

const printdata = () => {
    const resp = localStorage.getItem("response");
    let data = JSON.parse(resp);
    data.config.map(key => {
        if(key.selected){
            console.log(key.label + "..." + key.field.defaultValue + "..." + key.description);
        }
    })
}

const onSubmit = () => {
     updateLocalStorage();
     printdata();
}

const main = () => {
    let resp = localStorage.getItem("response");
    if(resp){
        console.log("Fetching from local storage ...");
        let jsonResp = JSON.parse(resp);
        createTable(jsonResp);
    }
    else {
        console.log("Fetching from network ...");
        getData();
    }
    
}
const submitbtn = document.getElementById('submitBtn');
    submitbtn.addEventListener('click', onSubmit);
const myInput = document.getElementById('myInput');
    myInput.addEventListener('keyup', onKeyUp);
document.addEventListener('DOMContentLoaded', main);
let tableData = {};
let tempData = {};

// to do add debounce and add event listeners
// read flex
//input changes and disable row

