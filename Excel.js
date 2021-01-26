
const ontextAdded = (e) => {
const id = e.target.id.split('in-')[1];
const row = id.split('.')[0];
const col = id.split('.')[1];
let data = localStorage.getItem("sheetData");
if(data){
    data = JSON.parse(data);
    if(data[`${row}`]){
        data[`${row}`][`${col}`]= e.target.value;
    }
    else{
        let coldata = {};
        coldata[`${col}`] = e.target.value;
        data[`${row}`] = coldata;
    }
}
else {
    data= {};
    let codata = {};
    codata[`${col}`] = e.target.value;
    data[`${row}`] = codata;
}
localStorage.setItem("sheetData", JSON.stringify(data));
}

const removeColdata=(col)=> {
    let data = localStorage.getItem("sheetData");
    if(data){
        data = JSON.parse(data);
        for(let i=0; i<rowTot; i++){
            const ival = i.toString();
            if(data && data[ival] && data[ival][col]){
                delete data[ival][col];
            }
            const colN = Number(col);
            for(let j = colN+1; j<colTot; j++){
                const prevCol = (j-1).toString();
                const currCol = j.toString();
                if(data && data[ival] && data[ival][currCol]){
                    data[ival][prevCol] = data[ival][currCol];
                    data[ival][currCol] = '';
                }
            }
        }
    }
    localStorage.setItem("sheetData", JSON.stringify(data));
}

const sortCols = (cId) => {
    let data = JSON.parse(localStorage.getItem("sheetData"));
}

const onColChange = (e) => {
    const id = e.target.id.split("sel-")[1];
    const value = e.target.value;
    if(value === 'delete'){
        const heEl = document.getElementById(`th-${id}`);
        heEl.remove();
        for(let i=0; i<rowTot; i++){
            const tdEl = document.getElementById(`td-${i}.${id}`);
            tdEl.remove();
        }
        removeColdata(id);
    }
    if(value === 'add'){
        colTot++;
        for(let i=0; i<rowTot; i++){
            let trEl = document.getElementById(`tr-${i}`);
            const tdEl = document.createElement('td');
            tdEl.setAttribute("id", `td-${i}.${colTot}`);
            let inpEl = document.createElement("input");
            inpEl.setAttribute("id", `in-${i}.${colTot}`);
            inpEl.addEventListener('change', ontextAdded);
            tdEl.appendChild(inpEl);
            trEl.appendChild(tdEl);
        }
    }
    if(value === 'sort'){
        sortCols(id);
    }
}

const onRowChange = (e) => {
    let data = JSON.parse(localStorage.getItem("sheetData"));
    const id = e.target.id.split("selr-")[1];
    const value = e.target.value;
    if(value === 'delete'){
        const trEl = document.getElementById(`tr-${id}`);
        trEl.remove();
        for(let i=0; i<rowTot; i++){
            const rowId = Number(id);
            if(i === rowId){
                if(data){
                   delete data[id];
                }
            }
            if(i>rowId){
                const prevr = (i-1).toString(); const currr= i.toString();
                if(data && data[currr]){
                    data[prevr] = data[currr];
                }
            }
        }
        localStorage.setItem("sheetData", JSON.stringify(data));
    }
    
}


const main = () => {   
    let data = localStorage.getItem("sheetData");
    if(data){
        data = JSON.parse(data);
    }
    const tableEl = document.getElementById("table");
    const mainRowEl = document.getElementById("mainRow");
    for(let i=0; i<colTot; i++){
        let thEl = document.createElement("th");
        thEl.setAttribute("id", `th-${i}`)
        

        let divEl = document.createElement('select');
        divEl.setAttribute("id", `sel-${i}`);
        divEl.addEventListener('change', onColChange)
        let opt0 = document.createElement('option')
        opt0.innerText= 'select';
        let opt1 = document.createElement('option')
        opt1.innerText= 'add';
        let opt2 = document.createElement('option')
        opt2.innerText= 'delete';
        let opt3 = document.createElement('option')
        opt3.innerText= 'sort';

        let pel = document.createElement('label');
        pel.setAttribute("for", `sel-${i}`);
        pel.innerText= i;
        thEl.appendChild(pel)
        divEl.appendChild(opt0)
        divEl.appendChild(opt1)
        divEl.appendChild(opt2)
        thEl.appendChild(divEl);
        mainRowEl.appendChild(thEl);
    }
    for(let r=0; r< rowTot; r++){
        
        let rowEl = document.createElement("tr");
        rowEl.setAttribute("id", `tr-${r}`);
        let thEl = document.createElement("th");

        let selectEl = document.createElement('select');
        selectEl.setAttribute("id", `selr-${r}`);
        selectEl.addEventListener('change', onRowChange)
        let sopt0 = document.createElement('option')
        sopt0.innerText= 'select';
        let sopt1 = document.createElement('option')
        sopt1.innerText= 'add';
        let sopt2 = document.createElement('option')
        sopt2.innerText= 'delete';
        let pl = document.createElement('label');
        pl.setAttribute("for", `sel-${r}`);
        pl.innerText= r;
        thEl.appendChild(pl);
        selectEl.appendChild(sopt0);
        selectEl.appendChild(sopt1);
        selectEl.appendChild(sopt2);
        thEl.appendChild(selectEl);
        rowEl.appendChild(thEl);
        tableEl.appendChild(rowEl);

        for(let c=0; c<colTot; c++){
            let cellval = '';
            let rowv = r.toString();
            let colv = c.toString();
            if(data && data[rowv] && data[rowv][colv]){
                cellval = data[rowv][colv];
            }
            let colEl = document.createElement("td");
            colEl.setAttribute("id", `td-${r}.${c}`);
            let inpEl = document.createElement("input");
            inpEl.setAttribute("id", `in-${r}.${c}`);
            inpEl.value = cellval;
            inpEl.addEventListener('change', ontextAdded);
            colEl.appendChild(inpEl);
            rowEl.appendChild(colEl);
        }
    }
}

document.addEventListener('DOMContentLoaded', main);
let rowTot = 10; let colTot = 10;