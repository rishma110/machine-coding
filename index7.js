const onSkip = () => {
    const qEl = document.getElementById('qContainer');
    const data = localStorage.getItem('data');
    const parsedData = JSON.parse(data);
    currentQ = currentQ + 1;
    localStorage.setItem('currentQ', JSON.stringify(currentQ));
    if(qEl){
        qEl.remove();
    }
    createQ(parsedData);
    selectedVals=[];
}

const onSubmit = () => {
    const data = localStorage.getItem('data');
    const parsedData = JSON.parse(data);
    
    const qEl = document.getElementById('qContainer');
    const questions = parsedData.questions;
    const divEll = document.getElementById("count");
    const qKeys = Object.keys(cummVals);
    const buttonEl = document.getElementById("button-container");

    if(currentQ === questions.length){
        if(buttonEl){
            divEll.innerText = "Thanks for taking the survey";
            buttonEl.remove();
            qEl.remove();
        }
        qKeys.map(eachKey => {
            console.log(eachKey + ' -- ' + cummVals[eachKey])
        })
        return;
    }

    const isRequired = parsedData.questions[currentQ - 1].required;
    if(isRequired){
        if(selectedVals.length > 0){
            cummVals[currentQ.toString()] = selectedVals.join(',');
            currentQ = currentQ + 1;
            localStorage.setItem('currentQ', JSON.stringify(currentQ));
            if(qEl){
                qEl.remove();
            }
            createQ(parsedData);
        }
        else {
            alert("please select an option before you submit");
        }
    }
    else {
        cummVals[currentQ.toString()] = selectedVals.join(',');
        currentQ = currentQ + 1;
        localStorage.setItem('currentQ', JSON.stringify(currentQ));
        if(qEl){
            qEl.remove();
        }
        createQ(parsedData);
    }
    selectedVals = [];
}

const onInputSelected = (e) => {
const label = e.target.nextSibling;
const val = label.innerText;
const checked = e.target.checked;
if(checked){
    selectedVals.push(val);
}
else{
    let ind = selectedVals.indexOf(val);
    selectedVals.splice(ind, 1);
}
}

const createAnswer = (data)=> {
    
    const answertCont = document.createElement('div');
    const classAtt = data.optionsPerRow === 'GRID' ? 'grid' : 'list';
    answertCont.setAttribute("class", classAtt);

    const type = data.inputType === 'MULTI_SELECT' ? 'checkbox' : 'radio';
    const inpstyle = data.optionsPerRow === 'GRID' ? 'gridCont' : 'listCont';
    const isImagePresent = data.answerType === "IMAGE_TEXT";
    const winwidth = data.optionsPerRow === 'GRID' ?  window.innerWidth/2 : window.innerWidth;
  
        data.options.map(val => {
            let inpcont = document.createElement('div');
            inpcont.setAttribute("class", inpstyle);

            let inpEl = document.createElement('input');
            inpEl.setAttribute("id", currentQ.toString());
            inpEl.setAttribute("type", type);
            inpEl.addEventListener('change', onInputSelected);
            inpcont.appendChild(inpEl);

            let label = document.createElement('label');
            label.setAttribute("for", currentQ.toString());
            if(isImagePresent){
                let imgEl = document.createElement('img');
            imgEl.src= val.image;
            let textEl = document.createElement('div');
            textEl.innerText = val.text;
            label.appendChild(imgEl);
            label.appendChild(textEl);
            }
            else {
                label.innerText = val;
            }
            
            label.style.width = winwidth;
            inpcont.appendChild(label);
            answertCont.appendChild(inpcont);  
        });

    return answertCont;

}


const createQuestions = (data) => {
    if(currentQ > data.questions.length) {
        return;
    }
    else {
        const Qdata = data.questions[currentQ - 1];
        const isRequired = Qdata.required;
    
        const containerEL = document.getElementById("container");
        const QEl = document.createElement('div');
        QEl.setAttribute('id', 'qContainer');
        containerEL.appendChild(QEl)
    
        const q = document.createElement('div');
        q.setAttribute('id', currentQ);
        q.innerText = Qdata.question;
        QEl.appendChild(q);
    
        QEl.appendChild(createAnswer(Qdata));
    
        if(isRequired){
            skipEl.style.visibility = 'hidden';
        }
        else {
            skipEl.style.visibility = 'visible';
        }
    }

}

const createQ = (data) => {
    const countEl = document.getElementById("count");
    const questions = data.questions;
    if(currentQ > questions.length){
        const qKeys = Object.keys(cummVals);
        qKeys.map(eachKey => {
            console.log(eachKey + ' -- ' + cummVals[eachKey])
        })
        return;
    }
    else {
        countEl.innerText = "We are currently on question " + currentQ + "/" + questions.length;
        createQuestions(data);
    }
   

}

const getData = () => {
    fetch('https://api.mocki.io/v1/f04da837')
    .then(resp=>resp.json())
    .then(resp => {
        localStorage.setItem('data', JSON.stringify(resp));
        createQ(resp);
    })
}

const main = () => {
    const data = localStorage.getItem('data');
    currentQ = Number(localStorage.getItem('currentQ'));
    if(!currentQ){
        currentQ = 1;
        localStorage.setItem('currentQ', JSON.stringify(currentQ));
    }
    let questionData;
    if(data) {
        questionData = JSON.parse(data);
        createQ(questionData);
    }
    else {
        getData();
    }
}

document.addEventListener('DOMContentLoaded', main);
const skipEl = document.getElementById("skip");
const submitEl = document.getElementById("submit");
skipEl.addEventListener('click', onSkip);
submitEl.addEventListener('click', onSubmit);
let currentQ; let selectedVals=[]; let cummVals={};
