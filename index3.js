const getData = () => {
    data = {
        "levelConfigs": [
            {
    "levelName": "Level 1",
    "gridSize": 3,
    "cellLitDuration": 1000,
    "levelDuration": 5000,
    "levelPassingScore": 2
            },
    {
        "levelName": "Level 2",
    "gridSize": 4,
        "cellLitDuration": 1000,
                "levelDuration": 5000,
                "levelPassingScore": 2
            },
    {
        "levelName": "Level 3",
    "gridSize": 5,
        "cellLitDuration": 500,
                "levelDuration": 5000,
                "levelPassingScore": 6
            }
        ]
    };
}

const randomNum = (num) => {
    return Math.floor(Math.random() * num) + 1  
}

const onLitClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    score--;
}

const onDivClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    score++; 
}

const startGame = () => {
let config = data.levelConfigs[currentLevel];
let {gridSize, cellLitDuration, levelDuration, levelPassingScore } = config;
let gridToLit = randomNum(gridSize*gridSize);
let div = document.getElementById(gridToLit);
// dummy.style.display = '';
// if(div.removeEventListener){
//     div.removeEventListener("click", onLitClick);
// }
div.style.display ="none";

setTimeout(()=>{
div.style.display ="";

}, cellLitDuration)
}

const conditionPassed =(levelPassingScore) => {
    if(score >= levelPassingScore){
        currentLevel++;
        return true;
    }
    return false;
}

const removeChild = () => {
    let body = document.getElementById("main");
    let container = document.getElementById("container")
    container.remove();
    let newCont = document.createElement("div");
    body.appendChild(newCont);
    newCont.setAttribute("id", 'container');
    newCont.setAttribute("class", 'container');
}

const initializeBoard = () => {
    score = 0;
    if(currentLevel > 2){
        return;
    }
let config = data.levelConfigs[currentLevel];

let {gridSize, cellLitDuration, levelDuration, levelPassingScore } = config;
let container = document.getElementById("container");
let winWidth = window.innerWidth;
let width = winWidth/gridSize;
let counter = 1;
for (let row=0; row<gridSize; row++){
    let rowd = document.createElement('div');
    for(let col=0; col<gridSize; col++){
        let id = counter;
        let cold = document.createElement('div');
        cold.setAttribute("id", id + '-real');
        cold.setAttribute("class", "div");
        cold.style.width = width;
        cold.style.height = width;
        cold.addEventListener("click", onDivClick)

        let dummy = document.createElement('div');
        dummy.setAttribute("id", id);
        dummy.setAttribute("class", "dummy");
        dummy.style.width = width;
        dummy.style.height = width;
        dummy.innerText = id;
        dummy.addEventListener("click", onLitClick)
        cold.appendChild(dummy);
        counter++;
        
        rowd.appendChild(cold);
    }
    container.appendChild(rowd);
}

let timer = setInterval(()=>{
    startGame();
}, cellLitDuration);

setTimeout(()=>{
    console.log("Your score in level ", + (currentLevel + 1) + " is " + score);
    if(conditionPassed(levelPassingScore)){
        clearInterval(timer);
        removeChild();
        cummlativeScore = score + cummlativeScore;
        initializeBoard();
    }
    else{
        clearInterval(timer);
        cummlativeScore = score + cummlativeScore;
        console.log("score is ", cummlativeScore);
        return;
    }
}, levelDuration)

}

const main = () => {
   console.log("start");
   getData();
   initializeBoard();
}

document.addEventListener('DOMContentLoaded', main);
let data={}; let currentLevel = 0; let score =0; let cummlativeScore = 0;