const checkGame = () => {
    if(!arr.length){
        return false;
    }
    let won = true; let min = arr[0];
    for(let i=1; i<arr.length; i++){
        if(arr[i] > min){
            min = arr[i];
        }
        else{
            won = false;
            return;
        }
    }
    return won;
}


const submitClick = () => {
    if(checkGame()){
        console.log("Congratulations you won the game");
    }
    else {
        console.log("You lost the game.");
    }
}

const dropCondition = (dropIndex) => {
    let emptycellcol = dragIndex % 3;
    const dragInd = Number(dragIndex);
    switch(emptycellcol){
        case 0:
            return (dragInd + 3 === dropIndex || dragInd - 3 === dropIndex || dragInd + 1 === dropIndex);
        case 1:
            return (dragInd + 3 === dropIndex || dragInd - 3 === dropIndex || dragInd + 1 === dropIndex || dragInd - 1 === dropIndex);
        case 2:
            return (dragInd + 3 === dropIndex || dragInd - 3 === dropIndex || dragInd - 1 === dropIndex );
        default:
            return false;
        }
    }

const drag = (e) => {
    console.log("dragging");
    dragIndex = e.target.id;
    console.log(dragIndex);
}

const dropItem = (dropIndex) => {
    let dragEl = document.getElementById(dragIndex);
    let dropEl = document.getElementById(dropIndex);
    dropEl.innerText = dragEl.innerText;
    dragEl.innerText = 'x';
    dragEl.addEventListener("drop", drop);
    dragEl.addEventListener("dragover", allowDrop);
    dragEl.setAttribute("class", "empty");
    dropEl.setAttribute("draggable", "true");
    dropEl.addEventListener("dragstart", drag);
    dropEl.setAttribute("class", "cols");
    //swap in arr
    let dropInd = Number(dropIndex); let dragInd = Number(dragIndex);
    arr[dropInd] = arr[dragInd];
    arr[dragInd] = 'x';
}

const drop = (e) => {
    console.log("dropping");
    e.preventDefault();
    var dropIndex = Number(e.target.id);
    console.log("data", e.target);
    //only if it being dropped on an empty div
    let canDrop = dropCondition(dropIndex);
    if((arr.indexOf('x') === dropIndex) && canDrop){
        dropItem(e.target.id);
       console.log('right condition');
    }
    
    //set dragged div to empty

}

const allowDrop = (e) => {
    e.preventDefault();
}

const initializeBoard = () => {
    let containerEl = document.getElementById("container");
    let n = 3;
    arr = [];
    while(arr.length < n*n){
        let r = Math.floor(Math.random() * n*n) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    let emptyCellIndex = Math.floor(Math.random() * (n*n - 1));
    arr[emptyCellIndex] = 'x';
    let counter = -1;
    for(let row=0; row<n; row++){
        let rowD = document.createElement('div');
        rowD.setAttribute("id", "row");
        rowD.setAttribute("class", "rows");
        containerEl.appendChild(rowD);
        for(let col=0; col<n; col++){
            counter++;
            let colD = document.createElement('div');
            colD.setAttribute("id", counter);
            colD.innerText = arr[counter];
            
            if(arr[counter] === 'x'){
                colD.addEventListener("drop", drop);
                colD.addEventListener("dragover", allowDrop);
                colD.setAttribute("class", "empty");
            }
            else {
                colD.setAttribute("draggable", "true");
                colD.addEventListener("dragstart", drag);
                colD.setAttribute("class", "cols");
            }
                
            rowD.appendChild(colD);
        }
    }
}

const refreshGame = () => {
    let body = document.getElementById("board");
    let container = document.getElementById("container")
    container.remove();
    let newCont = document.createElement("div");
    body.appendChild(newCont);
    newCont.setAttribute("id", 'container');
    newCont.setAttribute("class", 'container');
    initializeBoard();
}


const main = () => {
    console.log("start");
    initializeBoard();
 }
 
 document.addEventListener('DOMContentLoaded', main);
 let submitEl = document.getElementById('submit');
 submitEl.addEventListener('click', submitClick)
 let refreshEl = document.getElementById('refresh');
 refreshEl.addEventListener('click', refreshGame)
 let dragIndex; let arr = [];
